import { Component, computed, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeroesApi } from '../../api/heroes.api';
import { HeroesTablePagination } from '../../components/heroes-table-pagination/heroes-table-pagination';
import { HeroesTable } from '../../components/heroes-table/heroes.table';
import { Hero } from '../../models/hero.model';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-home',
  imports: [HeroesTable, MatButton, HeroesTablePagination],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private readonly heroesApi = inject(HeroesApi);
  private readonly router = inject(Router);
  protected readonly heroes: Signal<Hero[]> = toSignal(this.heroesApi.getHeroes(), {
    initialValue: [],
  });

  protected readonly page = signal(0);
  protected readonly pageSize = signal(PAGE_SIZE);

  protected readonly pagedHeroes: Signal<Hero[]> = computed(() => {
    const start = this.page() * this.pageSize();
    return this.heroes().slice(start, start + this.pageSize());
  });

  onPageChange(page: number): void {
    this.page.set(page);
  }

  createHero(): void {
    this.router.navigateByUrl('create');
  }
}
