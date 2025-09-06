import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    imports: [
        FormsModule
    ],
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    darkMode: boolean = false;

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
    }
}
