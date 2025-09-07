import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TicketService} from "../../../core/services/ticket.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-ticket-create',
    templateUrl: './ticket-create.component.html',
    imports: [
        FormsModule,
        RouterLink
    ],
    styleUrls: ['./ticket-create.component.scss']
})
export class TicketCreateComponent {
    ticket = {
        ticketNumber: '',
        visitType: '',
        ticketType: '',
        customerType: '',
        priceGroup: ''
    };

    constructor(
        private ticketService: TicketService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
    }

    onSubmit() {
        this.ticketService.createTicket(this.ticket).subscribe({
            next: () => {
                this.router.navigate(['/']).then(() => {
                    this.snackBar.open('✅ Ticket erfolgreich erstellt!', 'OK', {
                        duration: 3000,
                        panelClass: ['snackbar-success']
                    });
                });
            },
            error: () => {
                this.router.navigate(['/']).then(() => {
                    this.snackBar.open('❌ Fehler beim Erstellen des Tickets!', 'OK', {
                        duration: 3000,
                        panelClass: ['snackbar-error']
                    });
                });
            }
        });
    }
}
