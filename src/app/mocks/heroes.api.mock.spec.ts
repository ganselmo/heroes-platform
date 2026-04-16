import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { EditHeroDTO } from '../dto/edit-hero.dto';
import { Hero } from '../models/hero.model';
import { heroesBackendMockInterceptor, resetMockBackend } from './heroes-backend-mock.interceptor';
import { HeroesMockApi } from './heroes.api.mock';

describe('HeroesMockApi via HeroesApi', () => {
  let heroesApi: HeroesApi;
  const searchId = 5;
  const expectedHulk: Hero = {
    id: searchId,
    name: 'Hulk',
    franchise: 'Marvel',
    description: 'A scientist who transforms into a powerful green monster.',
  };
  const expectedCaptain: Hero = {
    id: 3,
    name: 'Captain America',
    franchise: 'Marvel',
    description: 'A super soldier enhanced during World War II.',
  };

  beforeEach(() => {
    resetMockBackend();
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroesApi, useClass: HeroesMockApi },
        provideHttpClient(withInterceptors([heroesBackendMockInterceptor])),
      ],
    });
    heroesApi = TestBed.inject(HeroesApi);
  });

  it('should be defined', () => {
    expect(heroesApi).toBeTruthy();
  });

  describe('Execute getHeroes', () => {
    it('should return initial heroes', async () => {
      const heroes = await firstValueFrom(heroesApi.getHeroes());
      expect(heroes).toBeDefined();
      expect(heroes.length).toBeGreaterThan(1);
    });
  });

  describe('Execute getHero', () => {
    it('should return a specific hero by id', async () => {
      const hero = await firstValueFrom(heroesApi.getHero(searchId));
      expect(hero).toEqual(expectedHulk);
    });
  });

  describe('Execute createHero', () => {
    it('should create a new hero', async () => {
      const heroesBefore = await firstValueFrom(heroesApi.getHeroes());
      const initialLength = heroesBefore.length;
      const newHero: CreateHeroDTO = {
        name: 'General',
        franchise: 'Other',
        description: 'Veteran',
      };
      await firstValueFrom(heroesApi.createHero(newHero));
      const heroesAfter = await firstValueFrom(heroesApi.getHeroes());
      expect(heroesAfter.length).toBe(initialLength + 1);
      expect(heroesAfter.some((h) => h.name === 'General')).toBe(true);
    });
  });

  describe('Execute deleteHero', () => {
    it('should delete a hero', async () => {
      const heroesBefore = await firstValueFrom(heroesApi.getHeroes());
      const initialLength = heroesBefore.length;
      await firstValueFrom(heroesApi.deleteHero(1));
      const heroesAfter = await firstValueFrom(heroesApi.getHeroes());
      expect(heroesAfter.length).toBe(initialLength - 1);
    });
  });

  describe('Execute editHero', () => {
    it('should edit a hero', async () => {
      const editData: EditHeroDTO = {
        name: 'Hulk',
        franchise: 'Marvel',
        description: 'Edited',
      };
      await firstValueFrom(heroesApi.editHero(searchId, editData));
      const edited = await firstValueFrom(heroesApi.getHero(searchId));
      expect(edited).toEqual({ ...expectedHulk, description: 'Edited' });
    });
  });

  describe('Execute Specific Search', () => {
    it('should find Captain America using Capt Substring', async () => {
      heroesApi.filterHeroesBySubstring('Capt');
      const filtered = await firstValueFrom(heroesApi.getHeroes());
      expect(filtered).toBeDefined();
      expect(filtered).toContainEqual(expectedCaptain);
    });
  });

  describe('Execute heroesFilter reset', () => {
    it('should reset the filter and return all heroes', async () => {
      heroesApi.filterHeroesBySubstring('Capt');
      const filtered = await firstValueFrom(heroesApi.getHeroes());
      heroesApi.resetFilter();
      const all = await firstValueFrom(heroesApi.getHeroes());
      expect(all.length).toBeGreaterThan(filtered.length);
    });
  });
});
