import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAnchor } from '@angular/material/button';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/hero-form/hero.form';
import { HeroesMockApi } from '../../mocks/heroes.api.mock';
import { LoadingService } from '../../services/loading/loading.service';
import { CreateHeroPage } from './create-hero.page';

describe('CreateHeroPage', () => {
  let component: CreateHeroPage;
  let fixture: ComponentFixture<CreateHeroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHeroPage, HeroForm, MatAnchor],
      providers: [{ provide: HeroesApi, useClass: HeroesMockApi }, LoadingService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHeroPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
