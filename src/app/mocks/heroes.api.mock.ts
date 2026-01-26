import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { EditHeroDTO } from '../dto/edit-hero.dto';
import { Hero } from '../models/hero.model';
import { heroesMock } from './heroes.mock';

@Injectable()
export class HeroesMock extends HeroesApi {
  private allHeroes: Hero[] = [...heroesMock];
  private heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([...this.allHeroes]);

  private currentFilter = '';
  private idNumber: number = heroesMock.length;

  override getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  override getHero(id: number): Observable<Hero | undefined> {
    return this.heroes$.asObservable().pipe(map((heroes) => heroes.find((hero) => hero.id === id)));
  }

  override deleteHero(id: number): void {
    const heroes = this.allHeroes.filter((hero) => hero.id != id);
    this.allHeroes = [...heroes];
    this.applyCurrentFilter();
  }

  override createHero(createHeroDto: CreateHeroDTO): void {
    this.idNumber++;
    const newHero: Hero = {
      id: this.idNumber,
      name: createHeroDto.name,
      franchise: createHeroDto.franchise,
      description: createHeroDto.description ?? '',
    };
    this.allHeroes = [...this.allHeroes, newHero];
    this.applyCurrentFilter();
  }

  override editHero(id: number, editHeroDto: EditHeroDTO): void {
    const heroToedit = this.heroes$.value.find((hero) => hero.id === id);
    const editedHero: Hero = Object.assign({}, heroToedit, editHeroDto);
    const updatedHeroes = this.allHeroes.map((hero) => (hero.id === id ? editedHero : hero));
    this.allHeroes = [...updatedHeroes];
    this.applyCurrentFilter();
  }

  override filterHeroesBySubstring(substring: string): void {
    this.currentFilter = substring;
    this.applyCurrentFilter();
  }

  override resetFilter(): void {
    this.currentFilter = '';
    this.applyCurrentFilter();
  }

  private applyCurrentFilter(): void {
    if (!this.currentFilter) {
      this.heroes$.next([...this.allHeroes]);
    } else {
      const filtered = this.allHeroes.filter((hero) =>
        hero.name.toLowerCase().includes(this.currentFilter.toLowerCase()),
      );
      this.heroes$.next(filtered);
    }
  }
}
