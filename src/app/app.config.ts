import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { HeroesApi } from './api/heroes.api';
import { HeroesMockApi } from './mocks/heroes.api.mock';
import { HeroesStateService } from './services/heroes-state/heroes-state.service';
import { LoadingService } from './services/loading/loading.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: HeroesApi, useClass: HeroesMockApi },
    { provide: LoadingService },
    { provide: HeroesStateService },
  ],
};
