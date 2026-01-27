import { Component, inject, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/forms/hero-form/hero.form';
import { CreateHeroDTO } from '../../dto/create-hero.dto';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-create-hero',
  imports: [HeroForm, MatAnchor],
  templateUrl: './create-hero.page.html',
  styleUrl: './create-hero.page.scss',
})
export class CreateHeroPage {
  private readonly router = inject(Router);
  private readonly heroesApi = inject(HeroesApi);
  private readonly loadingService: LoadingService = inject(LoadingService);

  protected formValue = signal<CreateHeroDTO | null>(null);
  protected formValid = signal(false);

  onValueChange(value: CreateHeroDTO) {
    this.formValue.set(value);
  }

  onValidChange(valid: boolean) {
    this.formValid.set(valid);
  }

  onConfirm(): void {
    const heroFormValue = this.formValue();

    if (!heroFormValue) {
      return;
    }
    if (this.formValid()) {
      this.loadingService.show();
      this.heroesApi
        .createHero(heroFormValue)
        .pipe(
          finalize(() => {
            this.loadingService.hide();
            this.router.navigateByUrl('home');
          }),
        )
        .subscribe();
    }
  }
  onCancel(): void {
    this.router.navigateByUrl('home');
  }
}
