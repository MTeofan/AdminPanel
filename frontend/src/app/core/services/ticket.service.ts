import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from "../models/ticket.model";

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    private apiUrl = 'http://localhost:8080/tickets';

    constructor(private http: HttpClient) {
    }

    getAllTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.apiUrl);
    }

    getTicketById(id: number): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
    }

    createTicket(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
        return this.http.post<Ticket>(this.apiUrl, ticket);
    }

    updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
        return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
    }

    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
