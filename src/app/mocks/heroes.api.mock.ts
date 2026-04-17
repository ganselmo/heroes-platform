import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { EditHeroDTO } from '../dto/edit-hero.dto';
import { Hero } from '../models/hero.model';
import { HeroesPaginatedResponse } from '../models/paginated-response.model';

@Injectable()
export class HeroesMockApi extends HeroesApi {
  private readonly http = inject(HttpClient);

  override getHeroes(page: number, pageSize: number, filter?: string): Observable<HeroesPaginatedResponse> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (filter) {
      params = params.set('filter', filter);
    }
    return this.http.get<HeroesPaginatedResponse>('/api/heroes', { params });
  }

  override getHero(id: number): Observable<Hero | undefined> {
    return this.http.get<Hero | undefined>(`/api/heroes/${id}`);
  }

  override deleteHero(id: number): Observable<void> {
    return this.http.delete<void>(`/api/heroes/${id}`);
  }

  override createHero(createHeroDto: CreateHeroDTO): Observable<void> {
    return this.http.post<void>('/api/heroes', createHeroDto);
  }

  override editHero(id: number, editHeroDto: EditHeroDTO): Observable<void> {
    return this.http.put<void>(`/api/heroes/${id}`, editHeroDto);
  }
}
