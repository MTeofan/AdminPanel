import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements AfterViewInit {

    ngAfterViewInit(): void {
        this.renderChart();
    }

    renderChart(): void {
        new Chart('customersPerDay', {
            type: 'bar',
            data: {
                labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                datasets: [{
                    label: 'Kunden pro Tag',
                    data: [120, 95, 80, 140, 200, 220, 150],
                    backgroundColor: 'rgba(75, 73, 172, 0.8)'
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
}
