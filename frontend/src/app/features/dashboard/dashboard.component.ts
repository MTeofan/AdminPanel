import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../core/models/ticket.model';
import {TicketService} from "../../core/services/ticket.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {UniquePipe} from "../../shared/pipe/unique.pipe";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        NgIf,
        NgForOf,
        SlicePipe,
        UniquePipe
    ],
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    tickets: Ticket[] = [];
    loading = true;
    error: string | null = null;

    constructor(private ticketService: TicketService) {}

    ngOnInit(): void {
        this.loadTickets();
    }

    loadTickets() {
        this.ticketService.getAllTickets().subscribe({
            next: (data) => {
                this.tickets = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Fehler beim Laden der Tickets';
                this.loading = false;
            }
        });
    }
}
