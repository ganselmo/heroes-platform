import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/forms/hero-form/hero.form';
import { NotificationService } from '../../services/notification/notification.service';
import { EditHeroPage } from './edit-hero.page';

describe('EditHeroPage', () => {
  let component: EditHeroPage;
  let fixture: ComponentFixture<EditHeroPage>;

  const mockHero = {
    id: 5,
    name: 'Hulk',
    franchise: 'Marvel',
    description: 'A scientist who transforms into a powerful green monster.',
  };

  const mockHeroesApi = {
    editHero: vi.fn(),
  };

  const mockNotificationService = {
    showError: vi.fn(),
    showSuccess: vi.fn(),
  };

  const mockRouter = {
    navigateByUrl: vi.fn(),
  };

  beforeEach(async () => {
    mockHeroesApi.editHero.mockReset();
    mockNotificationService.showError.mockReset();
    mockNotificationService.showSuccess.mockReset();
    mockRouter.navigateByUrl.mockReset();

    await TestBed.configureTestingModule({
      imports: [EditHeroPage, HeroForm, MatButton],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: HeroesApi, useValue: mockHeroesApi },
        { provide: NotificationService, useValue: mockNotificationService },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ hero: mockHero }),
            snapshot: { params: { id: '5' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Execute onConfirm', () => {
    it('should show success notification and navigate to home on successful edit', () => {
      mockHeroesApi.editHero.mockReturnValue(of(undefined));
      component.onValidChange(true);

      component.onConfirm();

      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Hero updated successfully');
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('home');
      expect(mockNotificationService.showError).not.toHaveBeenCalled();
    });

    it('should show error notification and not navigate on failure', () => {
      mockHeroesApi.editHero.mockReturnValue(throwError(() => new Error('Server error')));
      component.onValidChange(true);

      component.onConfirm();

      expect(mockNotificationService.showError).toHaveBeenCalledWith('Failed to update the hero');
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    });
  });
});
