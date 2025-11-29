import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, catchError, map, of, tap} from 'rxjs';
import {Ticket} from '../models/ticket.model';

export interface WeekDayCount {
    date: string;
    weekday: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
    count: number;
}

export interface WeeklyCustomerCounts {
    start: string;
    end: string;
    days: WeekDayCount[];
    total: number;
}

@Injectable({providedIn: 'root'})
export class TicketService implements OnDestroy {
    private apiUrl = 'http://localhost:8080/tickets';
    private wsUrl = this.apiUrl.replace(/^http/, 'ws').replace(/\/tickets$/, '/tickets/ws');

    private ws?: WebSocket;
    private wsReconnectAttempts = 0;
    private readonly wsMaxDelay = 30000;

    constructor(private http: HttpClient) {
        this.startLiveUpdates();
    }

    private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
    tickets$ = this.ticketsSubject.asObservable();

    getTicketsHttp(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl, {observe: 'response'}).pipe(
            map(res => Array.isArray(res.body) ? res.body as Ticket[] : []),
            catchError(() => of([]))
        );
    }

    getTicketsByCustomer(customer: string): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.apiUrl}/customer/${encodeURIComponent(customer)}`, {observe: 'response'}).pipe(
            map(res => Array.isArray(res.body) ? res.body as Ticket[] : []),
            catchError(() => of([]))
        );
    }

    getTicketsByPriceGroup(group: string): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.apiUrl}/priceGroup/${encodeURIComponent(group)}`, {observe: 'response'}).pipe(
            map(res => Array.isArray(res.body) ? res.body as Ticket[] : []),
            catchError(() => of([]))
        );
    }

    getTicketsByVisitType(type: string): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.apiUrl}/visitType/${encodeURIComponent(type)}`, {observe: 'response'}).pipe(
            map(res => Array.isArray(res.body) ? res.body as Ticket[] : []),
            catchError(() => of([]))
        );
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
        return this.http.get<Ticket[]>(this.apiUrl, {observe: 'response'}).pipe(
            map(res => Array.isArray(res.body) ? res.body as Ticket[] : []),
            tap(list => this.ticketsSubject.next(list)),
            catchError(() => of(this.ticketsSubject.value))
        );
    }

    startLiveUpdates(): void {
        this.loadOnce().subscribe();
        this.connectWs();
    }

    stopLiveUpdates(): void {
        this.teardownWs();
        this.wsReconnectAttempts = 0;
    }

    ngOnDestroy(): void {
        this.stopLiveUpdates();
    }

    private connectWs(): void {
        if (this.ws) return;
        try {
            this.ws = new WebSocket(this.wsUrl);
            this.ws.onopen = () => {
                this.wsReconnectAttempts = 0;
            };
            this.ws.onmessage = () => {
                this.loadOnce().subscribe();
            };
            this.ws.onerror = () => {
                this.scheduleWsReconnect();
            };
            this.ws.onclose = () => {
                this.scheduleWsReconnect();
            };
        } catch {
            this.scheduleWsReconnect();
        }
    }

    private scheduleWsReconnect(): void {
        this.teardownWs();
        const base = Math.min(this.wsMaxDelay, 1000 * Math.pow(2, this.wsReconnectAttempts));
        const jitter = Math.floor(Math.random() * 500);
        const delay = Math.max(1000, base + jitter);
        this.wsReconnectAttempts++;
        setTimeout(() => {
            this.loadOnce().subscribe();
            this.connectWs();
        }, delay);
    }

    private teardownWs(): void {
        if (this.ws) {
            try { this.ws.close(); } catch {}
            this.ws = undefined;
        }
    }

    getWeeklyCustomerCounts(startIso?: string): Observable<WeeklyCustomerCounts> {
        const monday = startIso && this.isIsoDate(startIso) ? startIso : this.mondayIso();
        const days = this.buildWeekDays(monday);
        return this.tickets$.pipe(
            map(list => {
                const counts = new Map<string, number>(days.map(d => [d.date, 0]));
                for (const t of list ?? []) {
                    const key = this.localDateVienna(t.createdAt);
                    if (key && counts.has(key)) {
                        counts.set(key, (counts.get(key) || 0) + 1);
                    }
                }
                const outDays = days.map(d => ({...d, count: counts.get(d.date) || 0}));
                const total = outDays.reduce((sum, d) => sum + d.count, 0);
                return {start: monday, end: this.addDaysIso(monday, 6), days: outDays, total};
            })
        );
    }

    getTodayCustomerCount(): Observable<number> {
        const todayKey = this.localDateVienna(new Date().toISOString());
        return this.tickets$.pipe(
            map(list => (list ?? []).filter(t => this.localDateVienna(t.createdAt) === todayKey).length)
        );
    }

    private readonly tz = 'Europe/Vienna';
    private readonly isoFmt = new Intl.DateTimeFormat('sv-SE', { timeZone: this.tz });
    private readonly weekdayFmt = new Intl.DateTimeFormat('en-GB', { timeZone: this.tz, weekday: 'short' });
    private readonly wdOrder = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const;

    private localDateVienna(iso?: string | null): string | null {
        if (!iso) return null;
        let s = iso.trim();
        if (s.includes(' ')) s = s.replace(' ', 'T');
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s += 'T00:00:00';
        if (!/[zZ]|[+-]\d{2}:\d{2}$/.test(s)) s += 'Z';
        const d = new Date(s);
        if (isNaN(d.getTime())) return null;
        return this.isoFmt.format(d);
    }

    private mondayIso(anchor?: Date): string {
        const base = anchor ?? new Date();
        const wd = this.weekdayFmt.format(base);
        const idx = this.wdOrder.indexOf(wd as any);
        const shift = idx < 0 ? 0 : idx;
        const copy = new Date(base.getTime());
        copy.setHours(0,0,0,0);
        copy.setDate(copy.getDate() - shift);
        return this.isoFmt.format(copy);
    }

    private addDaysIso(iso: string, n: number): string {
        const [y, m, d] = iso.split('-').map(Number);
        const utc = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
        utc.setUTCDate(utc.getUTCDate() + n);
        return this.isoFmt.format(utc);
    }

    private buildWeekDays(mondayIso: string): { date: string; weekday: WeekDayCount['weekday'] }[] {
        return this.wdOrder.map((wd, i) => ({ date: this.addDaysIso(mondayIso, i), weekday: wd }));
    }

    private isIsoDate(s: string): boolean {
        return /^\d{4}-\d{2}-\d{2}$/.test(s);
    }
}
