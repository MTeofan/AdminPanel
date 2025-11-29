import {Component, OnInit} from '@angular/core';
import {Ticket} from "../../core/models/ticket.model";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {TicketService} from "../../core/services/ticket.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        CurrencyPipe,
        NgForOf,
        NgIf
    ],
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dailyRevenue = 1530;
    dailyCustomers = 0;
    latestTickets: Ticket[] = [];
    private subs: Subscription[] = [];

    constructor(private ticketService: TicketService) {}

    ngOnInit(): void {
        this.subs.push(
            this.ticketService.getTodayCustomerCount().subscribe(n => this.dailyCustomers = n)
        );
        this.subs.push(
            this.ticketService.tickets$.subscribe(list => {
                this.latestTickets = (list ?? []).slice(0, 15);
            })
        );
    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }
}
