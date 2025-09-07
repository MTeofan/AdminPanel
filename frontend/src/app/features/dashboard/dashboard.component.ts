import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ticket} from "../../core/models/ticket.model";
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        CurrencyPipe,
        NgForOf
    ],
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dailyRevenue = 0;
    dailyCustomers = 0;
    latestTickets: Ticket[] = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        this.loadStats();
        this.loadLatestTickets();
    }

    loadStats(): void {
        // Dummy-Werte
        this.dailyRevenue = 1530;
        this.dailyCustomers = 120;
    }

    loadLatestTickets(): void {
        this.http.get<Ticket[]>('/api/tickets').subscribe({
            next: (tickets) => {
                this.latestTickets = tickets.slice(0, 5);
            },
            error: (err) => console.error('Fehler beim Laden der Tickets', err)
        });
    }
}
