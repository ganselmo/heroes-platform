import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, MatButtonModule, MatProgressSpinnerModule],

  styleUrl: './app.scss',
})
export class App {
  private readonly loadingService = inject(LoadingService);
  protected readonly loading = toSignal(this.loadingService.loading$);
}
