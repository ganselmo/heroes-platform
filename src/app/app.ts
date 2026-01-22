import { JsonPipe } from '@angular/common';
import { Component, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroesApi } from './api/heroes.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [JsonPipe],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Heroes Platform');
  protected readonly heroesApi = inject(HeroesApi);
  protected readonly heroes: Signal<any>;
  constructor() {
    this.heroes = toSignal(this.heroesApi.getHeroes());
  }
}
