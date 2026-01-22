import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, MatButtonModule],
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Heroes Platform');

  router = inject(Router);
  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
