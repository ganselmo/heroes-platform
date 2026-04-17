import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateHeroDTO } from '../dto/create-hero.dto';
import { EditHeroDTO } from '../dto/edit-hero.dto';
import { Hero } from '../models/hero.model';
import { HeroesPaginatedResponse } from '../models/paginated-response.model';

@Injectable()
export abstract class HeroesApi {
  abstract getHeroes(page: number, pageSize: number, filter?: string): Observable<HeroesPaginatedResponse>;
  abstract getHero(id: number): Observable<Hero | undefined>;
  abstract deleteHero(id: number): Observable<void>;
  abstract createHero(createHeroDto: CreateHeroDTO): Observable<void>;
  abstract editHero(id: number, editHeroDto: EditHeroDTO): Observable<void>;
}
