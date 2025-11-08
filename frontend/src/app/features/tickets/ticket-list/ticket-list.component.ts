import {Component, OnDestroy, OnInit} from '@angular/core';
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
    imports: [RouterLink, NgForOf],
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
    tickets: Ticket[] = [];

    // Dummy-Daten (nur wenn API leer oder Fehler)
    private dummyTickets: Ticket[] = [
        {
            id: 1,
            ticketNumber: 10001,
            visitType: 'Eintritt Dauerausstellung',
            ticketType: '1 Erwachsener',
            customerType: 'Standardbesucher',
            priceGroup: 'Regulär'
        },
        {
            id: 2,
            ticketNumber: 10002,
            visitType: 'Führung Museum',
            ticketType: 'Schulklasse',
            customerType: 'Schüler',
            priceGroup: 'Bildung'
        },
        {
            id: 3,
            ticketNumber: 10003,
            visitType: 'Eintritt Sonderausstellung',
            ticketType: '2 Erwachsene + 2 Kinder',
            customerType: 'Familie',
            priceGroup: 'Familienkarte'
        },
        {
            id: 4,
            ticketNumber: 10004,
            visitType: 'Abendveranstaltung',
            ticketType: '1 Student',
            customerType: 'Student',
            priceGroup: 'Ermäßigt'
        },
        {
            id: 5,
            ticketNumber: 10005,
            visitType: 'Eintritt Deepspace',
            ticketType: '1 Senior',
            customerType: 'Standardbesucher',
            priceGroup: 'Regulär'
        },
        {
            id: 6,
            ticketNumber: 10006,
            visitType: 'Eintritt Deepspace',
            ticketType: '3 Erwachsene',
            customerType: 'Gruppe',
            priceGroup: 'Gruppe'
        },
        {
            id: 7,
            ticketNumber: 10007,
            visitType: 'Eintritt Dauerausstellung',
            ticketType: '1 Erwachsener',
            customerType: 'Besucher mit Gutschein',
            priceGroup: 'Sonderaktion'
        },
        {
            id: 8,
            ticketNumber: 10008,
            visitType: 'Familienführung',
            ticketType: '1 Erwachsener + 3 Kinder',
            customerType: 'Familie',
            priceGroup: 'Familienkarte'
        },
        {
            id: 9,
            ticketNumber: 10009,
            visitType: 'Workshop Kunst',
            ticketType: '10 Personen',
            customerType: 'Studierende',
            priceGroup: 'Bildung'
        },
        {
            id: 10,
            ticketNumber: 10010,
            visitType: 'Führung Museum',
            ticketType: '1 Erwachsener',
            customerType: 'Studierende',
            priceGroup: 'Regulär'
        }
    ];

    constructor(private ticketService: TicketService) {
    }

    ngOnInit(): void {
        this.ticketService.startLiveUpdates();

        this.ticketService.tickets$.subscribe(list => {
            if (Array.isArray(list) && list.length > 0) {
                this.tickets = list;
            } else {
                // Dummy-Daten anzeigen, wenn Liste leer/Fehler
                this.tickets = this.dummyTickets;
            }
        });
    }

    ngOnDestroy(): void {
        this.ticketService.stopLiveUpdates();
    }

    deleteTicket(id: number | undefined) {
        if (!id) return;
        if (confirm('Bist du sicher, dass du dieses Ticket löschen willst?')) {
            this.ticketService.deleteTicket(id).subscribe({
                next: () => this.ticketService.loadOnce().subscribe(), // nach dem Löschen neu laden
                error: (err) => console.error('Fehler beim Löschen:', err)
            });
        }
    }
}
