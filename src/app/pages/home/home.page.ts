import { JsonPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroesApi } from '../../api/heroes.api';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly heroesApi = inject(HeroesApi);
  protected readonly heroes: Signal<any> = toSignal(this.heroesApi.getHeroes());
}
