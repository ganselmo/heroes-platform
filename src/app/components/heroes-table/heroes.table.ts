import { Component, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Hero } from '../../models/hero.model';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-heroes-table',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './heroes.table.html',
  styleUrl: './heroes.table.scss',
})
export class HeroesTable {
  heroes = input<Hero[]>([]);
  headerRowDefinition = ['id', 'name', 'franchise', 'description', 'action'];

  page = signal(0);
  pageSize = signal(PAGE_SIZE);

  pagedHeroes = computed(() => {
    const start = this.page() * this.pageSize();
    return this.heroes().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.heroes().length / this.pageSize()));

  nextPage(): void {
    if (this.page() < this.totalPages() - 1) {
      this.page.update((page) => page + 1);
    }
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.update((page) => page - 1);
    }
  }
}
