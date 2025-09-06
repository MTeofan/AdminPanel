import {Component} from '@angular/core';
import {DashboardComponent} from "./features/dashboard/dashboard.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        DashboardComponent
    ],
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
