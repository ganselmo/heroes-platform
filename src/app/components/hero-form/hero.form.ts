import { Component, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeroFormValue } from '../../models/hero-form-value';
import { HeroFormModel } from '../../models/hero-form.model';
import { Franchise } from '../../types/franchise.type';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './hero.form.html',
  styleUrl: './hero.form.scss',
})
export class HeroForm {
  readonly initialValue = input<HeroFormValue | null>(null);

  protected franchises: { value: Franchise }[] = [
    { value: 'Marvel' },
    { value: 'DC' },
    { value: 'Other' },
  ];

  private fb = inject(FormBuilder);

  heroesForm: FormGroup<HeroFormModel> = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    franchise: ['Other' as Franchise, [Validators.required]],
    description: ['', [Validators.maxLength(255)]],
  });

  protected valueChange = output<HeroFormValue>();
  protected validChange = output<boolean>();

  constructor() {
    effect(() => {
      const hero = this.initialValue();

      if (!hero) return;

      this.heroesForm.patchValue(
        {
          name: hero.name,
          franchise: hero.franchise,
          description: hero.description,
        },
        { emitEvent: false },
      );
    });

    this.heroesForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      const value = this.heroesForm.getRawValue();
      this.valueChange.emit(value);
      this.validChange.emit(this.heroesForm.valid);
    });
  }
}
