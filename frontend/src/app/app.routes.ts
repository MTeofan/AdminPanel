import {Routes} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {TicketListComponent} from "./features/tickets/ticket-list/ticket-list.component";
import {TicketDetailComponent} from "./features/tickets/ticket-detail/ticket-detail.component";
import {StatisticsComponent} from "./features/statistics/statistics.component";
import {SettingsComponent} from "./features/settings/settings.component";
import {TicketCreateComponent} from "./features/tickets/ticket-create/ticket-create.component";

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'tickets', component: TicketListComponent},
    {path: 'tickets/new', component: TicketCreateComponent},
    {path: 'ticket/:id', component: TicketDetailComponent},
    {path: 'statistics', component: StatisticsComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '**', redirectTo: '/dashboard'}
];
