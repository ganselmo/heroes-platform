import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { Hero } from '../models/hero.model';
import { heroesMock } from './heroes.mock';

@Injectable()
export class HeroesMock extends HeroesApi {
  private heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(heroesMock);

  private idNumber: number = heroesMock.length;

  override getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }
  override deleteHero(id: number): void {
    const heroes = this.heroes$.value.filter((hero) => hero.id != id);
    this.heroes$.next(heroes);
  }

  override createHero(createHeroDto: CreateHeroDTO): void {
    this.idNumber++;
    const newHero: Hero = {
      id: this.idNumber,
      name: createHeroDto.name,
      franchise: createHeroDto.franchise,
      description: createHeroDto.description ?? '',
    };
    this.heroes$.next([...this.heroes$.value, newHero]);
  }
}
