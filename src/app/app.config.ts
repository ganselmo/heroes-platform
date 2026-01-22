import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { HeroesApi } from './api/heroes.api';
import { HeroesMock } from './mocks/heroes.mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: HeroesApi, useClass: HeroesMock },
  ],
};
