import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Ticket} from "../../../core/models/ticket.model";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    imports: [
        NgIf,
        RouterLink
    ],
    styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
    ticket?: Ticket;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.http.get<Ticket>(`/api/tickets/${id}`).subscribe({
                next: (data) => {
                    this.ticket = data;
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Fehler beim Laden des Tickets', err);
                    this.loading = false;
                }
            });
        }
    }

    back(): void {
        this.router.navigate(['/tickets']);
    }
}
