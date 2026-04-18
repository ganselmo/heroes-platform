import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/forms/hero-form/hero.form';
import { HeroFormValue } from '../../models/hero-form-value';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-edit-hero',
  imports: [HeroForm, MatButton],
  templateUrl: './edit-hero.page.html',
  styleUrl: './edit-hero.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHeroPage {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly heroesApi = inject(HeroesApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notificationService = inject(NotificationService);

  protected readonly initialValue = toSignal(this.getResolvedHero(), {
    requireSync: true,
  });

  protected readonly formValue = signal<HeroFormValue>(this.initialValue());
  protected readonly formValid = signal(false);

  onValueChange(value: HeroFormValue) {
    this.formValue.set(value);
  }

  onValidChange(valid: boolean) {
    this.formValid.set(valid);
  }

  onConfirm(): void {
    const heroFormValue = this.formValue();
    const heroId = this.getHeroId();
    if (!heroFormValue) {
      return;
    }
    if (this.formValid()) {
      this.heroesApi
        .editHero(heroId, heroFormValue)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Hero updated successfully');
            this.router.navigateByUrl('home');
          },
          error: () => this.notificationService.showError('Failed to update the hero'),
        });
    }
  }
  onCancel(): void {
    this.router.navigateByUrl('home');
  }

  private getResolvedHero(): Observable<HeroFormValue> {
    return this.activatedRoute.data.pipe(map((data) => (data as { hero: HeroFormValue }).hero));
  }
  private getHeroId(): number {
    return Number(this.activatedRoute.snapshot.params['id']);
  }
}
