import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SettingsService, AppSettings} from '../../core/services/settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    imports: [CommonModule, FormsModule],
})
export class SettingsComponent implements OnInit {
    darkMode = false;
    emailNotifications = false;

    constructor(private settings: SettingsService) {
    }

    ngOnInit(): void {
        this.settings.settings$.subscribe((s: AppSettings) => {
            this.darkMode = (s.theme === 'dark');
            this.emailNotifications = s.emailNotifications;
        });
    }

    toggleDarkMode() {
        this.settings.setTheme(this.darkMode ? 'dark' : 'light');
    }

    toggleEmail() {
        this.settings.setEmailNotifications(this.emailNotifications);
    }
}
