import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class HeroesStateService {
  private readonly _filter$ = new BehaviorSubject<string>('');

  get filter$(): Observable<string> {
    return this._filter$.asObservable();
  }

  setFilter(substring: string) {
    this._filter$.next(substring);
  }

  resetFilter() {
    this._filter$.next('');
  }
}
