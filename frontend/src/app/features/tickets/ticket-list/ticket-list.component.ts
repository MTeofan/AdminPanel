import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../../../core/services/ticket.service';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {combineLatest, map, Observable, startWith} from 'rxjs';
import {Ticket} from '../../../core/models/ticket.model';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    imports: [RouterLink, NgForOf, ReactiveFormsModule, AsyncPipe, NgIf],
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
    filters = new FormGroup({
        query: new FormControl<string>('', {nonNullable: true}),
        visitType: new FormControl<string>('', {nonNullable: true}),
        priceGroup: new FormControl<string>('', {nonNullable: true}),
    });

    filtered$!: Observable<Ticket[]>;

    constructor(private ticketService: TicketService) {
    }

    ngOnInit(): void {
        this.ticketService.startLiveUpdates();

        const base$ = this.ticketService.tickets$.pipe(
            map(list => Array.isArray(list) ? list as Ticket[] : [])
        );

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
