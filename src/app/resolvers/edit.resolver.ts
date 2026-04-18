import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { Hero } from '../models/hero.model';
import { NotificationService } from '../services/notification/notification.service';

export const editResolver: ResolveFn<Hero | undefined> = (route) => {
  const heroesApi = inject(HeroesApi);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return heroesApi.getHero(Number(route.params['id'])).pipe(
    map((hero) => {
      if (!hero) {
        throw new Error('Hero not found');
      }
      return hero;
    }),
    catchError(() => {
      notificationService.showError('Failed to load the hero');
      router.navigateByUrl('home');
      return EMPTY;
    }),
  );
};
