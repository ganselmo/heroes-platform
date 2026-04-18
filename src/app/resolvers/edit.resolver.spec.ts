import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { Hero } from '../models/hero.model';
import { NotificationService } from '../services/notification/notification.service';
import { editResolver } from './edit.resolver';

describe('editResolver', () => {
  let heroesApi: HeroesApi;

  const mockHeroesApi = {
    getHero: vi.fn(),
  };

  const mockRouter = {
    navigateByUrl: vi.fn(),
  };

  const mockNotificationService = {
    showError: vi.fn(),
  };

  beforeEach(() => {
    mockRouter.navigateByUrl.mockReset();
    mockNotificationService.showError.mockReset();

    TestBed.configureTestingModule({
      providers: [
        { provide: HeroesApi, useValue: mockHeroesApi },
        { provide: Router, useValue: mockRouter },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    });
    heroesApi = TestBed.inject(HeroesApi);
  });

  describe('Resolve Hero', () => {
    it('should resolve a hero by id', () => {
      const mockHero: Hero = {
        id: 1,
        name: 'Iron Man',
        franchise: 'Marvel',
        description: 'Man With Iron Suit',
      };
      mockHeroesApi.getHero.mockReturnValue(of(mockHero));

      const route = { params: { id: '1' } } as unknown as ActivatedRouteSnapshot;
      const state = {} as RouterStateSnapshot;

      let result: Hero | undefined;
      const obs$ = TestBed.runInInjectionContext(() => editResolver(route, state));
      (obs$ as ReturnType<typeof of>).subscribe((value) => (result = value as Hero));

      expect(heroesApi.getHero).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockHero);
    });
  });

  describe('Error Handling', () => {
    it('should navigate to home and show error on failure', () => {
      mockHeroesApi.getHero.mockReturnValue(throwError(() => new Error('Not found')));

      const route = { params: { id: '999' } } as unknown as ActivatedRouteSnapshot;
      const state = {} as RouterStateSnapshot;

      let emitted = false;
      const obs$ = TestBed.runInInjectionContext(() => editResolver(route, state));
      (obs$ as ReturnType<typeof of>).subscribe({ next: () => (emitted = true) });

      expect(emitted).toBe(false);
      expect(mockNotificationService.showError).toHaveBeenCalledWith('Failed to load the hero');
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('home');
    });
  });
});
