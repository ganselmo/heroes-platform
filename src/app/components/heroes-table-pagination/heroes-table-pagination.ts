import { Component, computed, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-heroes-table-pagination',
  imports: [MatButton],
  templateUrl: './heroes-table-pagination.html',
  styleUrl: './heroes-table-pagination.scss',
})
export class HeroesTablePagination {
  totalItems = input.required<number>();
  pageSize = input<number>(10);
  pageChange = output<number>();

  page = signal(0);

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  nextPage(): void {
    if (this.page() < this.totalPages() - 1) {
      this.page.update((page) => page + 1);
      this.pageChange.emit(this.page());
    }
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.update((page) => page - 1);
      this.pageChange.emit(this.page());
    }
  }
}
