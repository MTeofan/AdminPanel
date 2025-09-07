import {Component} from '@angular/core';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./shared/header/header/header.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet,
        HeaderComponent
    ],
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
