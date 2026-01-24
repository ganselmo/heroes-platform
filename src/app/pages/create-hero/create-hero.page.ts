import { Component, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { Router } from '@angular/router';
import { HeroForm } from '../../components/hero-form/hero.form';

@Component({
  selector: 'app-create-hero',
  imports: [HeroForm, MatAnchor],
  templateUrl: './create-hero.page.html',
  styleUrl: './create-hero.page.scss',
})
export class CreateHeroPage {
  private readonly router = inject(Router);
  onConfirm(): void {
    console.log('Confirm');
  }
  onCancel(): void {
    this.router.navigateByUrl('home');
  }
}
