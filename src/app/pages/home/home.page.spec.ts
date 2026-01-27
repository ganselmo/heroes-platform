import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { HeroesApi } from '../../api/heroes.api';
import { HeroesMockApi } from '../../mocks/heroes.api.mock';
import { heroesMock } from '../../mocks/heroes.mock';
import { Hero } from '../../models/hero.model';
import { HeroesStateService } from '../../services/heroes-state/heroes-state.service';
import { LoadingService } from '../../services/loading/loading.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let router: Router;
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let heroesApi: HeroesApi;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        { provide: HeroesApi, useClass: HeroesMockApi },
        LoadingService,
        HeroesStateService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    heroesApi = TestBed.inject(HeroesApi);
  });

  describe('Hero Component Creation', () => {
    it('should create Component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Execute create Hero Navigation', () => {
    it('should navigate to Create', () => {
      const navigateSpy = vi.spyOn(router, 'navigateByUrl');
      component.createHero();
      expect(navigateSpy).toHaveBeenCalledWith('create');
    });
  });

  describe('Home heroes table page Change', () => {
    it('should change page to 2', () => {
      const pageValue = 2;
      component.onPageChange(pageValue);
      expect(component.page()).toBe(pageValue);
    });
  });

  describe('Execute resetFilter', () => {
    it('should call resetFilter from HeroesApi', () => {
      const spy = vi.spyOn(heroesApi, 'resetFilter');
      component.resetFilter();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Execute filterBySubstring', () => {
    it('should call filterHeroesBySubstring with a search term', () => {
      const spy = vi.spyOn(heroesApi, 'filterHeroesBySubstring');
      const searchTerm = 'Spiderman';
      component.filterBySubstring(searchTerm);
      expect(spy).toHaveBeenCalledWith(searchTerm);
    });
  });

  describe('Heroes Signal', () => {
    it('should load heroes from api at initialization', () => {
      const mockHeroes: Hero[] = heroesMock;
      vi.spyOn(heroesApi, 'getHeroes').mockReturnValue(of(mockHeroes));
      fixture.detectChanges();
      expect((component as any).heroes()).toEqual(mockHeroes);
    });
  });

  describe('UI composition', () => {
    it('should render title', async () => {
      await fixture.whenStable();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('Heroes List');
    });
  });
});
