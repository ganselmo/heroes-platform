import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HeroesApi } from './api/heroes.api';
import { errorInterceptor } from './interceptors/error.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { heroesBackendMockInterceptor } from './mocks/heroes-backend-mock.interceptor';
import { HeroesMockApi } from './mocks/heroes.api.mock';
import { HeroesStateService } from './services/heroes-state/heroes-state.service';
import { LoadingService } from './services/loading/loading.service';
import { NotificationService } from './services/notification/notification.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: HeroesApi, useClass: HeroesMockApi },
    { provide: LoadingService },
    { provide: HeroesStateService },
    { provide: NotificationService },
    provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor, heroesBackendMockInterceptor])),
  ],
};
