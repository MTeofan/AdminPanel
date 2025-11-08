import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, of, tap} from 'rxjs';
import {Ticket} from "../models/ticket.model";

@Injectable({providedIn: 'root'})
export class TicketService implements OnDestroy {

    private apiUrl = 'http://localhost:3000/tickets';

    // SSE-Stream (neue/aktualisierte Tickets)
    private streamUrl = 'http://localhost:3000/tickets/stream';

    constructor(private http: HttpClient) {
    }

    private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
    tickets$ = this.ticketsSubject.asObservable();

    getTicketsHttp(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl);
    }

    getTicketById(id: number): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
    }

    createTicket(ticket: {
        ticketNumber: string;
        visitType: string;
        ticketType: string;
        customerType: string;
        priceGroup: string;
    }): Observable<Ticket> {
        return this.http.post<Ticket>(this.apiUrl, ticket);
    }

    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateTicket(ticket: Ticket): Observable<Ticket> {
        return this.http.put<Ticket>(`${this.apiUrl}/${ticket.id}`, ticket);
    }

    loadOnce(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl).pipe(
            tap(list => this.ticketsSubject.next(Array.isArray(list) ? list : [])),
            catchError(() => {
                // Bei Fehler: nichts crashen lassen, alter State bleibt bestehen.
                return of(this.ticketsSubject.value);
            })
        );
    }

    // SSE mit Reconnect-Strategie
    private es?: EventSource;
    private reconnectTimer?: any;
    private reconnectAttempts = 0;
    private readonly maxReconnectDelayMs = 30000; // 30s

    startLiveUpdates(): void {
        if (this.es) return;

        this.loadOnce().subscribe();

        this.connectSse();
    }

    // Beendet Live-Updates (SSE schließen & Timer stoppen)
    stopLiveUpdates(): void {
        this.clearReconnectTimer();
        if (this.es) {
            try {
                this.es.close();
            } catch {
            }
            this.es = undefined;
        }
        this.reconnectAttempts = 0;
    }

    ngOnDestroy(): void {
        this.stopLiveUpdates();
    }

    // Implementierung: SSE + Reconnect
    private connectSse(): void {
        // doppelte Verbindungen vermeiden
        if (this.es) return;

        this.es = new EventSource(this.streamUrl, {withCredentials: false});

        // Reset Backoff bei erfolgreichem Connect
        this.es.onopen = () => {
            this.reconnectAttempts = 0;
            console.debug('SSE connected');
        };

        const reload = () => this.loadOnce().subscribe();

        this.es.addEventListener('ticket-created', () => reload());
        this.es.addEventListener('ticket-updated', () => reload());
        this.es.addEventListener('ticket-deleted', () => reload());

        this.es.onmessage = () => reload();

        // Fehler & Reconnect
        this.es.onerror = () => {
            this.tryScheduleReconnect();
        };
    }

    private tryScheduleReconnect(): void {
        if (this.es) {
            try {
                this.es.close();
            } catch {
            }
            this.es = undefined;
        }

        this.clearReconnectTimer();

        // Exponentielles Backoff mit Jitter
        const base = Math.min(this.maxReconnectDelayMs, 1000 * Math.pow(2, this.reconnectAttempts));
        const jitter = Math.floor(Math.random() * 500);
        const delay = Math.max(1000, base + jitter);

        this.reconnectAttempts++;

        this.reconnectTimer = setTimeout(() => {
            this.loadOnce().subscribe();
            this.connectSse();
        }, delay);
    }

    private clearReconnectTimer(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = undefined;
        }
    }
}
