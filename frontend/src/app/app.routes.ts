import {Routes} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {TicketListComponent} from "./features/tickets/ticket-list/ticket-list.component";
import {TicketDetailComponent} from "./features/tickets/ticket-detail/ticket-detail.component";
import {CustomerListComponent} from "./features/customers/customer-list/customer-list.component";
import {CustomerDetailComponent} from "./features/customers/customer-detail/customer-detail.component";
import {SettingsComponent} from "./features/settings/settings.component";

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'tickets', component: TicketListComponent },
    { path: 'ticket/:id', component: TicketDetailComponent },
    { path: 'customers', component: CustomerListComponent },
    { path: 'customer/:id', component: CustomerDetailComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: '' }
];

