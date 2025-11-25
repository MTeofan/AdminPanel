import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./shared/header/header/header.component";
import {SettingsService} from "./core/services/settings.service";

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
    constructor(private settings: SettingsService) {
        this.settings.initOnAppStart();
    }
}
