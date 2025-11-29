import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Ticket} from "../../../core/models/ticket.model";
import {TicketService} from "../../../core/services/ticket.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    imports: [
        FormsModule,
        NgIf,
        RouterLink
    ],
    styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent {
    editMode = false;
    loading = true;
    error?: string;

    ticketId!: number;
    ticket?: Ticket;

    private sub?: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ticketService: TicketService
    ) {
    }

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe(params => {
            const idParam = params.get('id');
            if (!idParam) {
                this.error = 'Keine Ticket-ID angegeben.';
                this.loading = false;
                return;
            }
            this.ticketId = Number(idParam);
            this.loadTicket();
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    private loadTicket(): void {
        this.loading = true;
        this.ticketService.getTicketById(this.ticketId).subscribe({
            next: (t) => {
                this.ticket = t;
                this.loading = false;
            },
            error: () => {
                this.error = 'Ticket konnte nicht geladen werden.';
                this.loading = false;
            }
        });
    }

    saveChanges() {
        if (!this.ticket) return;

        const payload: Ticket = {
            id: this.ticket.id,
            ticketNumber: this.ticket.ticketNumber,
            visitType: this.ticket.visitType,
            ticketType: this.ticket.ticketType,
            customerType: this.ticket.customerType,
            priceGroup: this.ticket.priceGroup
        };

        this.ticketService.updateTicket(payload).subscribe({
            next: (updated) => {
                this.ticket = updated;
                this.editMode = false;
                alert('Änderungen gespeichert.');
            },
            error: () => {
                alert('Speichern fehlgeschlagen.');
            }
        });
    }

    cancelEdit() {
        this.editMode = false;
        this.loadTicket();
    }

    back() {
        this.router.navigate(['/tickets']);
    }
}
