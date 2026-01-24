import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeroForm } from '../../components/hero-form/hero.form';

@Component({
  selector: 'app-edit-hero',
  imports: [HeroForm],
  templateUrl: './edit-hero.page.html',
  styleUrl: './edit-hero.page.scss',
})
export class EditHeroPage {
  private readonly router = inject(Router);
  onConfirm(): void {
    console.log('Confirm');
  }
  onCancel(): void {
    this.router.navigateByUrl('home');
  }
}
