import { Component, inject, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/hero-form/hero.form';
import { CreateHeroDTO } from '../../dto/create-hero.dto';

@Component({
  selector: 'app-create-hero',
  imports: [HeroForm, MatAnchor],
  templateUrl: './create-hero.page.html',
  styleUrl: './create-hero.page.scss',
})
export class CreateHeroPage {
  private readonly router = inject(Router);
  private readonly heroesApi = inject(HeroesApi);

  protected formValue = signal<CreateHeroDTO | null>(null);
  protected formValid = signal(false);

  onValueChange(value: CreateHeroDTO) {
    this.formValue.set(value);
  }

  onValidChange(valid: boolean) {
    this.formValid.set(valid);
  }

  onConfirm(): void {
    if (this.formValid()) {
      this.heroesApi.createHero(this.formValue()!);
      this.router.navigateByUrl('home');
    }
  }
  onCancel(): void {
    this.router.navigateByUrl('home');
  }
}
