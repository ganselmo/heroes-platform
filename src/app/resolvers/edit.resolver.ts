import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HeroesApi } from '../api/heroes.api';
import { Hero } from '../models/hero.model';

export const editResolver: ResolveFn<Hero | undefined> = (route, state) => {
  const heroesApi = inject(HeroesApi);
  const hero = heroesApi.getHero(Number(route.params['id']));
  return hero;
};
