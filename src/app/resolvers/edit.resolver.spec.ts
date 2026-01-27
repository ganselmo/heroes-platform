import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HeroesApi } from '../api/heroes.api';
import { Hero } from '../models/hero.model';
import { editResolver } from './edit.resolver';

describe('editResolver', () => {
  let heroesApi: HeroesApi;

  const mockHeroesApi = {
    getHero: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HeroesApi, useValue: mockHeroesApi }],
    });
    heroesApi = TestBed.inject(HeroesApi);
  });

  it('should resolve a hero by id', () => {
    const mockHero: Hero = {
      id: 1,
      name: 'Iron Man',
      franchise: 'Marvel',
      description: 'Man With Iron Suit',
    };
    mockHeroesApi.getHero.mockReturnValue(mockHero);

    const route = { params: { id: '1' } } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = TestBed.runInInjectionContext(() => editResolver(route, state));

    expect(heroesApi.getHero).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockHero);
  });

  it('should return undefined if hero is not found', () => {
    mockHeroesApi.getHero.mockReturnValue(undefined);

    const route = { params: { id: '999' } } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const result = TestBed.runInInjectionContext(() => editResolver(route, state));

    expect(result).toBeUndefined();
  });
});
