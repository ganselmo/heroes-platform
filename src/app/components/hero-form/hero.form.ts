import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeroFormModel } from '../../models/hero-form.model';
import { Franchise } from '../../types/franchise.type';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './hero.form.html',
  styleUrl: './hero.form.scss',
})
export class HeroForm {
  franchises: { value: Franchise }[] = [{ value: 'Marvel' }, { value: 'DC' }, { value: 'Other' }];
  heroesForm: FormGroup<HeroFormModel>;

  constructor(private fb: FormBuilder) {
    this.heroesForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      franchise: ['Other' as Franchise, [Validators.required]],
      description: ['', [Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    if (this.heroesForm.invalid) {
      this.heroesForm.markAllAsTouched();
      return;
    }

    const value = this.heroesForm.getRawValue();
    console.log(value);
  }
}
