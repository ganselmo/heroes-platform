import { Component, effect, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-heroes-table-pagination',
  imports: [MatButton],
  templateUrl: './heroes-table-pagination.html',
  styleUrl: './heroes-table-pagination.scss',
})
export class HeroesTablePagination {
  totalPages = input.required<number>();
  itemsPerPage = input<number>(10);
  pageChange = output<number>();

  protected currentPage = signal(0);

  constructor() {
    effect(() => {
      const safePage = Math.max(this.totalPages() - 1, 0);
      if (this.currentPage() > safePage) {
        this.currentPage.set(safePage);
        this.pageChange.emit(safePage);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.currentPage.update((page) => page + 1);
      this.pageChange.emit(this.currentPage());
    }
  }

  prevPage(): void {
    if (this.currentPage() > 0) {
      this.currentPage.update((page) => page - 1);
      this.pageChange.emit(this.currentPage());
    }
  }
}
