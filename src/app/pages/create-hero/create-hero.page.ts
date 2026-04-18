import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/forms/hero-form/hero.form';
import { CreateHeroDTO } from '../../dto/create-hero.dto';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-create-hero',
  imports: [HeroForm, MatAnchor],
  templateUrl: './create-hero.page.html',
  styleUrl: './create-hero.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHeroPage {
  private readonly router = inject(Router);
  private readonly heroesApi = inject(HeroesApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notificationService = inject(NotificationService);

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
      this.heroesApi
        .createHero(heroFormValue)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Hero created successfully');
            this.router.navigateByUrl('home');
          },
          error: () => this.notificationService.showError('Failed to create the hero'),
        });
    }
  }
  onCancel(): void {
    this.router.navigateByUrl('home');
  }
}
