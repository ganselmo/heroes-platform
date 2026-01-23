import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-heroes-table',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './heroes.table.html',
  styleUrl: './heroes.table.scss',
})
export class HeroesTable {
  heroes = input<Hero[]>([]);
  headerRowDefinition = ['id', 'name', 'franchise', 'description', 'action'];
}
