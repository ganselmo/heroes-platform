import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, of, switchMap } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { HeroesTableFilter } from '../../components/tables/heroes-table-filter/heroes-table-filter';
import { HeroesTablePagination } from '../../components/tables/heroes-table-pagination/heroes-table-pagination';
import { HeroesTable } from '../../components/tables/heroes-table/heroes.table';
import { HeroesPaginatedResponse } from '../../models/paginated-response.model';
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

  private readonly _page = signal(0);
  public readonly page = this._page.asReadonly();

  protected readonly itemsPerPage = signal(PAGE_SIZE);

  private readonly refresh$ = new BehaviorSubject<void>(undefined);

  private static readonly EMPTY_RESPONSE: HeroesPaginatedResponse = { items: [], total: 0, page: 0, pageSize: PAGE_SIZE };

  protected readonly paginatedResponse = toSignal(
    combineLatest([this.heroesStateService.filter$, toObservable(this._page), this.refresh$]).pipe(
      switchMap(([filter, page]) =>
        this.heroesApi.getHeroes(page, this.itemsPerPage(), filter || undefined).pipe(
          catchError(() => of(HomePage.EMPTY_RESPONSE)),
        ),
      ),
    ),
    { initialValue: HomePage.EMPTY_RESPONSE },
  );

  protected readonly pagedHeroes = computed(() => this.paginatedResponse().items);

  protected readonly totalPages = computed(() =>
    Math.ceil(this.paginatedResponse().total / this.itemsPerPage()),
  );

  protected readonly showPagination = computed(() => this.totalPages() > 1);

  protected readonly initialFilterValue = toSignal(this.heroesStateService.filter$, {
    requireSync: true,
  });

  onPageChange(page: number): void {
    this._page.set(page);
  }

  createHero(): void {
    this.router.navigateByUrl('create');
  }

  resetFilter(): void {
    this.heroesStateService.resetFilter();
  }

  filterBySubstring(subString: string): void {
    this.heroesStateService.setFilter(subString);
    this._page.set(0);
  }

  refreshHeroes(): void {
    this.refresh$.next();
  }
}
