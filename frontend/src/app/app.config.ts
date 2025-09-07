import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterLinkActive} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {MatSnackBarModule} from "@angular/material/snack-bar";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideHttpClient(), provideRouter(routes)],
};
