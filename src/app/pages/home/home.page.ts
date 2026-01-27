import { Component, computed, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HeroesApi } from '../../api/heroes.api';
import { HeroesTableFilter } from '../../components/tables/heroes-table-filter/heroes-table-filter';
import { HeroesTablePagination } from '../../components/tables/heroes-table-pagination/heroes-table-pagination';
import { HeroesTable } from '../../components/tables/heroes-table/heroes.table';
import { Hero } from '../../models/hero.model';
import { HeroesStateService } from '../../services/heroes-state/heroes-state.service';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-home',
  imports: [HeroesTable, MatButton, HeroesTableFilter, HeroesTablePagination, MatIconModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  private readonly heroesApi = inject(HeroesApi);
  private readonly router = inject(Router);
  private readonly heroesStateService = inject(HeroesStateService);

  protected readonly heroes: Signal<Hero[]> = toSignal(this.heroesApi.getHeroes(), {
    initialValue: [],
  });

  private readonly _page = signal(0);
  public readonly page = this._page.asReadonly();

  protected readonly itemsPerPage = signal(PAGE_SIZE);

  protected readonly showPagination = computed(() => this.totalPages() > 1);

  protected readonly initialFilterValue = toSignal(this.heroesStateService.filter$, {
    requireSync: true,
  });

  protected readonly pagedHeroes: Signal<Hero[]> = computed(() => {
    const start = this.page() * this.itemsPerPage();
    return this.heroes().slice(start, start + this.itemsPerPage());
  });

  protected totalPages = computed(() => Math.ceil(this.heroes().length / this.itemsPerPage()));

  onPageChange(page: number): void {
    this._page.set(page);
  }

  createHero(): void {
    this.router.navigateByUrl('create');
  }

  resetFilter(): void {
    this.heroesStateService.resetFilter();
    this.heroesApi.resetFilter();
  }

  filterBySubstring(subString: string): void {
    this.heroesStateService.setFilter(subString);
    this.heroesApi.filterHeroesBySubstring(subString);
    this._page.set(0);
  }
}
