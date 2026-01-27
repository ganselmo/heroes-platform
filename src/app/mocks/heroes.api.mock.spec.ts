import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { EditHeroDTO } from '../dto/edit-hero.dto';
import { Hero } from '../models/hero.model';
import { HeroesMockApi } from './heroes.api.mock';

describe('HeroesMockApi via HeroesApi', () => {
  let heroesApi: HeroesApi;
  let emittedHeroes: Hero[] = [];

  const searchId = 5;
  const searchPartialString = 'Capt';

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

  it('should be defined', () => {
    expect(heroesApi).toBeTruthy();
  });

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HeroesApi, useClass: HeroesMockApi }],
    });
    heroesApi = TestBed.inject(HeroesApi);
  });

  beforeEach(() => {
    emittedHeroes = getCurrentHeroes(heroesApi);
  });

  describe('Execute getHeroes', () => {
    it('should emit initial heroes', () => {
      const heroes = getCurrentHeroes(heroesApi);
      expect(heroes).toBeDefined();
      expect(heroes.length).toBeGreaterThan(1);
    });
  });

  describe('Execute getHero', () => {
    it('should emit an specific Hero', () => {
      const foundHero = getHeroById(heroesApi, searchId);

      expect(foundHero).toBeDefined();
      expect(foundHero).toEqual({
        id: searchId,
        name: 'Hulk',
        franchise: 'Marvel',
        description: 'A scientist who transforms into a powerful green monster.',
      });
    });
  });

  describe('Execute createHero', () => {
    it('should create a new hero', () => {
      const newHero: CreateHeroDTO = {
        name: 'General',
        franchise: 'Other',
        description: 'Veteran',
      };
      expect(newHero).toBeDefined();
      const initialLength = emittedHeroes.length;
      heroesApi.createHero(newHero);
      const heroesAfter = getCurrentHeroes(heroesApi);

      expect(heroesAfter.length).toBe(initialLength + 1);
      expect(heroesAfter.some((hero) => hero.name === 'General')).toBe(true);
    });
  });

  describe('Execute deleteHero', () => {
    it('should Delete the first Hero', () => {
      const initialLength = emittedHeroes.length;
      heroesApi.deleteHero(1);
      const heroesAfter = getCurrentHeroes(heroesApi);
      expect(heroesAfter.length).toBe(initialLength - 1);
    });
  });

  describe('Execute editHero', () => {
    it('should Edit the created Hero', () => {
      const editData: EditHeroDTO = {
        name: 'Hulk',
        franchise: 'Marvel',
        description: 'Edited',
      };
      heroesApi.editHero(searchId, editData);

      const foundHero = getHeroById(heroesApi, searchId);
      expect(foundHero).toBeDefined();
      expect(foundHero).toEqual({ ...expectedHulk, description: 'Edited' });
    });
  });

  describe('Execute Specific Search', () => {
    it('should find Captain America', () => {
      heroesApi.filterHeroesBySubstring(searchPartialString);

      const filtered = getCurrentHeroes(heroesApi);

      expect(filtered).toBeDefined();
      expect(filtered).toContainEqual(expectedCaptain);
    });
  });

  describe('Execute heroesFilter reset', () => {
    it('should be reseted', () => {
      const initialCount = emittedHeroes.length;

      heroesApi.resetFilter();

      const afterReset = getCurrentHeroes(heroesApi);
      expect(afterReset.length).toBeGreaterThanOrEqual(initialCount);
    });
  });
});

const getCurrentHeroes = (heroesApi: HeroesApi): Hero[] => {
  let result: Hero[] = [];
  heroesApi
    .getHeroes()
    .pipe(take(1))
    .subscribe((heroes) => (result = heroes));
  return result;
};

const getHeroById = (api: HeroesApi, id: number): Hero | undefined => {
  let foundHero: Hero | undefined;
  api
    .getHero(id)
    .pipe(take(1))
    .subscribe((hero) => (foundHero = hero));
  return foundHero;
};
