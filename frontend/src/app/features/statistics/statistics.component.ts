import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { TicketService } from '../../core/services/ticket.service';
import { Ticket } from '../../core/models/ticket.model';

Chart.register(...registerables);

type Wd = 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|'Sun';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
    private sub?: Subscription;

    barChart?: Chart;
    pieChart?: Chart;

    weekStartISO = '';
    weekEndISO = '';
    totalWeek = 0;

    private readonly tz = 'Europe/Vienna';
    private readonly wdOrder: Wd[] = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    private readonly deLabels = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];

    constructor(private ticketService: TicketService) {}

    ngOnInit(): void {
        this.sub = this.ticketService.tickets$.subscribe(list => {
            this.updateWeekCharts(list ?? []);
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.barChart?.destroy();
        this.pieChart?.destroy();
    }

    private updateWeekCharts(tickets: Ticket[]): void {
        const mondayISO = this.mondayIso();
        const days = this.buildWeekDates(mondayISO);
        this.weekStartISO = mondayISO;
        this.weekEndISO = this.addDaysIso(mondayISO, 6);

        const counts = new Array<number>(7).fill(0);

        const customerMap = new Map<string, number>();

        for (const t of tickets) {
            const key = this.localDateVienna(t.createdAt);
            if (!key) continue;

            const idx = days.findIndex(d => d.date === key);
            if (idx >= 0) {
                counts[idx] += 1;
                const cust = (t.customerType || 'Unbekannt').trim();
                customerMap.set(cust, (customerMap.get(cust) || 0) + 1);
            }
        }

        this.totalWeek = counts.reduce((a, b) => a + b, 0);

        this.renderBarChart(counts);
        this.renderPieChart(customerMap);
    }

    private renderBarChart(counts: number[]): void {
        const ctx = document.getElementById('barChart') as HTMLCanvasElement | null;
        if (!ctx) return;

        this.barChart?.destroy();

        const primary = this.cssVar('--color-primary') || '#4B49AC';

        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.deLabels,
                datasets: [{
                    label: 'Kunden pro Tag',
                    data: counts,
                    backgroundColor: primary,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                    }
                }
            }
        });
    }

    private renderPieChart(customerMap: Map<string, number>): void {
        const ctx = document.getElementById('pieChart') as HTMLCanvasElement | null;
        if (!ctx) return;

        this.pieChart?.destroy();

        const entries = [...customerMap.entries()].sort((a, b) => b[1] - a[1]);
        const top = entries.slice(0, 3);
        const rest = entries.slice(3);
        const restSum = rest.reduce((s, [, v]) => s + v, 0);

        const labels = top.map(([k]) => k);
        const data = top.map(([, v]) => v);
        if (restSum > 0) {
            labels.push('Andere');
            data.push(restSum);
        }
        if (labels.length === 0) {
            labels.push('Keine Daten');
            data.push(1);
        }

        const c1 = this.cssVar('--color-primary') || '#4B49AC';
        const c2 = this.cssVar('--color-primary-light') || '#98BDFF';
        const c3 = this.cssVar('--color-support-3') || '#F3797E';
        const c4 = this.cssVar('--color-support-2') || '#7978E9';
        const palette = [c1, c2, c3, c4];

        this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: labels.map((_, i) => palette[i % palette.length])
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    private localDateVienna(iso?: string): string | null {
        if (!iso) return null;
        const d = new Date(iso);
        if (isNaN(d.getTime())) return null;
        const fmt = new Intl.DateTimeFormat('sv-SE', { timeZone: this.tz });
        return fmt.format(d);
    }

    private mondayIso(anchor?: Date): string {
        const base = anchor ?? new Date();
        const wdFmt = new Intl.DateTimeFormat('en-GB', { timeZone: this.tz, weekday: 'short' });
        const wdStr = wdFmt.format(base) as Wd;
        const idx = this.wdOrder.indexOf(wdStr);
        const shift = idx < 0 ? 0 : idx;
        const copy = new Date(base.getTime());
        copy.setDate(copy.getDate() - shift);
        const isoFmt = new Intl.DateTimeFormat('sv-SE', { timeZone: this.tz });
        return isoFmt.format(copy);
    }

    private addDaysIso(iso: string, n: number): string {
        const d = new Date(iso);
        d.setDate(d.getDate() + n);
        const isoFmt = new Intl.DateTimeFormat('sv-SE', { timeZone: this.tz });
        return isoFmt.format(d);
    }

    private buildWeekDates(mondayIso: string): { date: string; wdIdx: number }[] {
        return this.wdOrder.map((_, i) => ({ date: this.addDaysIso(mondayIso, i), wdIdx: i }));
    }

    private cssVar(name: string): string {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
}
