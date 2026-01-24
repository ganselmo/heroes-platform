import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeroesApi } from '../../api/heroes.api';
import { HeroesTable } from '../../components/heroes-table/heroes.table';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-home',
  imports: [HeroesTable, MatButton],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private readonly heroesApi = inject(HeroesApi);
  private readonly router = inject(Router);

  protected readonly heroes: Signal<Hero[]> = toSignal(this.heroesApi.getHeroes(), {
    initialValue: [],
  });

  createHero(): void {
    this.router.navigateByUrl('create');
  }
}
