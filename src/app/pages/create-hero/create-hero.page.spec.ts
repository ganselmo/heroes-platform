import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAnchor } from '@angular/material/button';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { HeroForm } from '../../components/forms/hero-form/hero.form';
import { NotificationService } from '../../services/notification/notification.service';
import { CreateHeroPage } from './create-hero.page';

describe('CreateHeroPage', () => {
  let component: CreateHeroPage;
  let fixture: ComponentFixture<CreateHeroPage>;

  const mockHeroesApi = {
    createHero: vi.fn(),
  };

  const mockNotificationService = {
    showError: vi.fn(),
    showSuccess: vi.fn(),
  };

  const mockRouter = {
    navigateByUrl: vi.fn(),
  };

  beforeEach(async () => {
    mockHeroesApi.createHero.mockReset();
    mockNotificationService.showError.mockReset();
    mockNotificationService.showSuccess.mockReset();
    mockRouter.navigateByUrl.mockReset();

    await TestBed.configureTestingModule({
      imports: [CreateHeroPage, HeroForm, MatAnchor],
      providers: [
        { provide: HeroesApi, useValue: mockHeroesApi },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHeroPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Execute onConfirm', () => {
    it('should show success notification and navigate to home on successful creation', () => {
      mockHeroesApi.createHero.mockReturnValue(of(undefined));
      component.onValueChange({ name: 'TestHero', franchise: 'Marvel' });
      component.onValidChange(true);

      component.onConfirm();

      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Hero created successfully');
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('home');
      expect(mockNotificationService.showError).not.toHaveBeenCalled();
    });

    it('should show error notification and not navigate on failure', () => {
      mockHeroesApi.createHero.mockReturnValue(throwError(() => new Error('Server error')));
      component.onValueChange({ name: 'TestHero', franchise: 'Marvel' });
      component.onValidChange(true);

      component.onConfirm();

      expect(mockNotificationService.showError).toHaveBeenCalledWith('Failed to create the hero');
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
    });
  });
});
