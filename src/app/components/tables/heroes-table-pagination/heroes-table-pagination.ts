import { ChangeDetectionStrategy, Component, input, linkedSignal, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-heroes-table-pagination',
  imports: [MatButton],
  templateUrl: './heroes-table-pagination.html',
  styleUrl: './heroes-table-pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesTablePagination {
  totalPages = input.required<number>();
  itemsPerPage = input<number>(10);
  pageChange = output<number>();

  protected currentPage = linkedSignal<number, number>({
    source: this.totalPages,
    computation: (totalPages, previous) => {
      if (!previous) return 0;
      const safePage = Math.max(totalPages - 1, 0);
      return previous.value > safePage ? safePage : previous.value;
    },
  });

  constructor() {
    toObservable(this.currentPage)
      .pipe(takeUntilDestroyed())
      .subscribe((page) => this.pageChange.emit(page));
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update((page) => page + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update((page) => page - 1);
    }
  }
}
