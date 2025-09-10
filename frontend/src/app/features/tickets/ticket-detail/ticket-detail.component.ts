import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

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

    ticket = {
        ticketNumber: 10003,
        visitType: 'Eintritt Sonderausstellung',
        ticketType: '2 Erwachsene + 2 Kinder',
        customerType: 'Familie',
        priceGroup: 'Familienkarte',
        state: 'valid',
        validUntil: '2025-12-31'
    };

    saveChanges() {
        console.log('Gespeichertes Ticket:', this.ticket);
        this.editMode = false;
        alert('Änderungen gespeichert (lokal, kein Backend).');
    }
}
