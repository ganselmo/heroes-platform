import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';

@Injectable()
export class HeroesMock extends HeroesApi {
  override getHeroes(): Observable<{}[]> {
    return of([
      { id: 1, name: 'Batman' },
      { id: 2, name: 'Superman' },
    ]);
  }
}
