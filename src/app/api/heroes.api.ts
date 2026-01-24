import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../models/hero.model';

@Injectable()
export abstract class HeroesApi {
  abstract getHeroes(): Observable<Hero[]>;
  abstract deleteHero(id: number): void;
}
