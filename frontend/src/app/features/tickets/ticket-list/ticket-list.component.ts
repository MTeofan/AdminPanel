import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Ticket} from "../../../core/models/ticket.model";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    imports: [
        RouterLink,
        NgForOf
    ],
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
    tickets: Ticket[] = [];
    loading = true;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.loadTickets();
    }

    loadTickets(): void {
        this.loading = true;
        this.http.get<Ticket[]>('/api/tickets').subscribe({
            next: (data) => {
                this.tickets = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Fehler beim Laden der Tickets', err);
                this.loading = false;
            }
        });
    }

    deleteTicket(id: number): void {
        if (!confirm('Willst du dieses Ticket wirklich löschen?')) return;
        this.http.delete(`/api/tickets/${id}`).subscribe({
            next: () => this.loadTickets(),
            error: (err) => console.error('Löschen fehlgeschlagen', err)
        });
    }

    goToDetails(id: number): void {
        this.router.navigate(['/ticket', id]);
    }
}
