import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

type Theme = 'light' | 'dark';

export interface AppSettings {
    theme: Theme;
    emailNotifications: boolean;
}

const KEY = 'app_settings';

@Injectable({providedIn: 'root'})
export class SettingsService {
    private readonly defaultSettings: AppSettings = {theme: 'light', emailNotifications: false};
    private subject = new BehaviorSubject<AppSettings>(this.read());
    readonly settings$ = this.subject.asObservable();

    private read(): AppSettings {
        try {
            const raw = localStorage.getItem(KEY);
            return raw ? JSON.parse(raw) as AppSettings : this.defaultSettings;
        } catch {
            return this.defaultSettings;
        }
    }

    private write(v: AppSettings) {
        localStorage.setItem(KEY, JSON.stringify(v));
    }

    initOnAppStart() {
        this.applyTheme(this.subject.value.theme);
    }

    setTheme(theme: Theme) {
        const next = {...this.subject.value, theme};
        this.applyTheme(theme);
        this.subject.next(next);
        this.write(next);
    }

    setEmailNotifications(enabled: boolean) {
        const next = {...this.subject.value, emailNotifications: enabled};
        this.subject.next(next);
        this.write(next);
    }

    private applyTheme(theme: Theme) {
        const root = document.documentElement; // <html>
        root.classList.toggle('dark', theme === 'dark');
    }
}
