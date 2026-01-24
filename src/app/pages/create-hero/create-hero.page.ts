import { Component } from '@angular/core';
import { HeroForm } from '../../components/hero-form/hero.form';

@Component({
  selector: 'app-create-hero',
  imports: [HeroForm],
  templateUrl: './create-hero.page.html',
  styleUrl: './create-hero.page.scss',
})
export class CreateHeroPage {}
