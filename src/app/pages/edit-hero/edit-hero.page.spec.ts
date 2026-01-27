import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/forms/hero-form/hero.form';
import { HeroesMockApi } from '../../mocks/heroes.api.mock';
import { LoadingService } from '../../services/loading/loading.service';
import { EditHeroPage } from './edit-hero.page';

describe('EditHeroPage', () => {
  let component: EditHeroPage;
  let fixture: ComponentFixture<EditHeroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroPage, HeroForm, MatButton],
      providers: [
        Router,
        { provide: HeroesApi, useClass: HeroesMockApi },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              hero: {
                id: 5,
                name: 'Hulk',
                franchise: 'Marvel',
                description: 'A scientist who transforms into a powerful green monster.',
              },
            }),
          },
        },
        LoadingService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
