import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { Hero } from '../models/hero.model';
import { heroesMock } from './heroes.mock';

@Injectable()
export class HeroesMock extends HeroesApi {
  heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(heroesMock);

  override getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }
  override deleteHero(id: number): void {
    const heroes = this.heroes$.value.filter((hero) => hero.id != id);
    this.heroes$.next(heroes);
  }
}
