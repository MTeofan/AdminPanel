import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from "../../../core/services/ticket.service";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {combineLatest, map, Observable, startWith} from 'rxjs';

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
    imports: [RouterLink, NgForOf, ReactiveFormsModule, AsyncPipe],
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

    // Filter-Form
    filters = new FormGroup({
        query: new FormControl<string>('', {nonNullable: true}),
        visitType: new FormControl<string>('', {nonNullable: true}),
        priceGroup: new FormControl<string>('', {nonNullable: true}),
    });

    // Gefilterte Tickets für das Template
    filtered$!: Observable<Ticket[]>;

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
        // Live-Updates starten (Polling bzw. später WebSocket/SSE)
        this.ticketService.startLiveUpdates();

        // Tickets aus Service, bei leer/Fehler -> Dummy
        const base$ = this.ticketService.tickets$.pipe(
            map(list => (Array.isArray(list) && list.length > 0) ? list as Ticket[] : this.dummyTickets)
        );

        // Gefiltertes Ergebnis
        this.filtered$ = combineLatest([
            base$,
            this.filters.valueChanges.pipe(startWith(this.filters.value))
        ]).pipe(
            map(([list, f]) => {
                const q = (f?.query ?? '').toLowerCase().trim();
                const vt = (f?.visitType ?? '').toLowerCase().trim();
                const pg = (f?.priceGroup ?? '').toLowerCase().trim();

                return list.filter(t => {
                    const qHit =
                        !q ||
                        String(t.ticketNumber).includes(q) ||
                        (t.visitType ?? '').toLowerCase().includes(q) ||
                        (t.ticketType ?? '').toLowerCase().includes(q) ||
                        (t.customerType ?? '').toLowerCase().includes(q) ||
                        (t.priceGroup ?? '').toLowerCase().includes(q);

                    const vtHit = !vt || (t.visitType ?? '').toLowerCase().includes(vt);
                    const pgHit = !pg || (t.priceGroup ?? '').toLowerCase().includes(pg);

                    return qHit && vtHit && pgHit;
                });
            })
        );
    }

    ngOnDestroy(): void {
        this.ticketService.stopLiveUpdates();
    }

    trackId = (_: number, t: Ticket) => t.id ?? t.ticketNumber;

    deleteTicket(id: number | undefined) {
        if (!id) return;
        if (confirm('Bist du sicher, dass du dieses Ticket löschen willst?')) {
            this.ticketService.deleteTicket(id).subscribe({
                next: () => this.ticketService.loadOnce().subscribe(),
                error: (err) => console.error('Fehler beim Löschen:', err)
            });
        }
    }
}
