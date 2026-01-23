import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroesApi } from '../../api/heroes.api';
import { HeroesTable } from '../../components/heroes-table/heroes.table';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-home',
  imports: [HeroesTable],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly heroesApi = inject(HeroesApi);
  protected readonly heroes: Signal<Hero[]> = toSignal(this.heroesApi.getHeroes(), {
    initialValue: [],
  });
}
