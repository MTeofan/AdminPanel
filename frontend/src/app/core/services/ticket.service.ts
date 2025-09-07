import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from "../models/ticket.model";

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    private apiUrl = 'http://localhost:3000/tickets'; // oder dein echtes Backend

    constructor(private http: HttpClient) {
    }

    getTickets(): Observable<Ticket[]> {
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
        priceGroup: string
    }): Observable<Ticket> {
        return this.http.post<Ticket>(this.apiUrl, ticket);
    }

    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
        return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
    }
}
