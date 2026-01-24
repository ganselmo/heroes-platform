import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateHeroDTO } from '../../dto/create-hero.dto';
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

  fb = inject(FormBuilder);

  heroesForm: FormGroup<HeroFormModel> = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    franchise: ['Other' as Franchise, [Validators.required]],
    description: ['', [Validators.maxLength(255)]],
  });

  protected valueChange = output<CreateHeroDTO>();
  protected validChange = output<boolean>();

  constructor() {
    this.heroesForm.valueChanges.subscribe(() => {
      const value = this.heroesForm.getRawValue();
      this.valueChange.emit(value);
      this.validChange.emit(this.heroesForm.valid);
    });
  }
}
