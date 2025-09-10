import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
        RouterLink,
        RouterLinkActive,
        MatIcon,
        MatIconButton,
    ],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
}
