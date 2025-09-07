import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
// import { TicketService, Ticket } from '../ticket.service'; // momentan nicht nötig

Chart.register(...registerables);

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    // tickets: Ticket[] = []; // später, wenn Backend läuft
    barChart: any;
    pieChart: any;

    // constructor(private ticketService: TicketService) {} // später

    constructor() {}

    ngOnInit(): void {
        // Backend später aktivieren:
        // this.ticketService.getTickets().subscribe({
        //   next: (data) => {
        //     this.tickets = data;
        //     this.renderBarChart();
        //     this.renderPieChart();
        //   },
        //   error: (err) => console.error('Fehler beim Laden der Tickets:', err)
        // });

        // aktuell nur statisch
        this.renderBarChart();
        this.renderPieChart();
    }

    renderBarChart(): void {
        const ctx = document.getElementById('barChart') as HTMLCanvasElement;
        if (this.barChart) {
            this.barChart.destroy();
        }

        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                datasets: [{
                    label: 'Kunden pro Tag',
                    data: [12, 19, 8, 15, 22, 30, 18], // Statische Dummy-Daten
                    backgroundColor: '#4B49AC'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    renderPieChart(): void {
        const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
        if (this.pieChart) {
            this.pieChart.destroy();
        }

        this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Standardbesucher', 'Schüler', 'VIP'],
                datasets: [{
                    data: [40, 25, 35], // Statische Dummy-Daten
                    backgroundColor: ['#4B49AC', '#98BDFF', '#F3797E']
                }]
            },
            options: {
                responsive: true
            }
        });
    }
}
