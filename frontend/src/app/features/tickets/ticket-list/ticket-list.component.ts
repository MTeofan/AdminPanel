import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../core/services/ticket.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

interface Ticket {
    id?: number;
    ticketNumber: number;
    visitType: string;
    ticketType: string;
    customerType: string;
    priceGroup: string;
}

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

    // Dummy-Daten (werden nur verwendet, falls API nichts zurückgibt)
    private dummyTickets: Ticket[] = [
        {
            id: 1,
            ticketNumber: 12345,
            visitType: 'Eintritt Wappensaal',
            ticketType: '1 Erwachsener',
            customerType: 'Standardbesucher',
            priceGroup: 'Sonstige Besucher'
        },
        {
            id: 2,
            ticketNumber: 23456,
            visitType: 'Führung Burg',
            ticketType: 'Schulklasse',
            customerType: 'Schüler',
            priceGroup: 'Bildung'
        },
        {
            id: 3,
            ticketNumber: 34567,
            visitType: 'Ausstellung',
            ticketType: '2 Erwachsene',
            customerType: 'Familie',
            priceGroup: 'Standard'
        }
    ];

    constructor(private ticketService: TicketService) {}

    ngOnInit(): void {
        this.loadTickets();
    }

    loadTickets() {
        this.ticketService.getTickets().subscribe({
            next: (data: any) => {
                if (data && data.length > 0) {
                    this.tickets = data;
                } else {
                    // Falls API leer ist → Dummy Daten
                    this.tickets = this.dummyTickets;
                }
            },
            error: () => {
                // Falls API nicht erreichbar → Dummy Daten
                this.tickets = this.dummyTickets;
            }
        });
    }

    deleteTicket(id: number | undefined) {
        if (!id) return;

        if (confirm('Bist du sicher, dass du dieses Ticket löschen willst?')) {
            this.ticketService.deleteTicket(id).subscribe({
                next: () => this.loadTickets(),
                error: (err) => console.error('Fehler beim Löschen:', err)
            });
        }
    }
}
