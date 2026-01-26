import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateHeroDTO } from '../dto/create-hero.dto';
import { EditHeroDTO } from '../dto/edit-hero.dto';
import { Hero } from '../models/hero.model';

@Injectable()
export abstract class HeroesApi {
  abstract getHeroes(): Observable<Hero[]>;
  abstract getHero(id: number): Observable<Hero | undefined>;
  abstract deleteHero(id: number): void;
  abstract createHero(createHeroDto: CreateHeroDTO): void;
  abstract editHero(id: number, editHeroDto: EditHeroDTO): void;
  abstract filterHeroesBySubstring(substring: string): void;
  abstract resetFilter(): void;
}
