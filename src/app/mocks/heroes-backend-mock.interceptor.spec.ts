import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Hero } from '../models/hero.model';
import { heroesBackendMockInterceptor, resetMockBackend } from './heroes-backend-mock.interceptor';
import { heroesMock } from './heroes.mock';
describe('heroesBackendMockInterceptor', () => {
  let http: HttpClient;

  beforeEach(() => {
    resetMockBackend();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([heroesBackendMockInterceptor]))],
    });
    http = TestBed.inject(HttpClient);
  });

  describe('Execute GET /api/heroes', () => {
    it('should return all heroes', async () => {
      const heroes = await firstValueFrom(http.get<Hero[]>('/api/heroes'));
      expect(heroes.length).toBe(heroesMock.length);
    });
    it('should filter heroes by query param', async () => {
      const heroes = await firstValueFrom(
        http.get<Hero[]>('/api/heroes', { params: { filter: 'Spider' } }),
      );
      expect(heroes.length).toBeGreaterThan(0);
      expect(heroes.every((h) => h.name.toLowerCase().includes('spider'))).toBe(true);
    });
  });

  describe('Execute GET /api/heroes/:id', () => {
    it('should return a hero by id', async () => {
      const hero = await firstValueFrom(http.get<Hero>('/api/heroes/1'));
      expect(hero).toBeDefined();
      expect(hero.id).toBe(1);
      expect(hero.name).toBe('Spider-Man');
    });
    it('should return undefined for non-existent id', async () => {
      const hero = await firstValueFrom(http.get<Hero | undefined>('/api/heroes/9999'));
      expect(hero).toBeNull();
    });
  });

  describe('Execute POST /api/heroes', () => {
    it('should add a new hero', async () => {
      await firstValueFrom(http.post('/api/heroes', { name: 'TestHero', franchise: 'Other' }));
      const heroes = await firstValueFrom(http.get<Hero[]>('/api/heroes'));
      expect(heroes.length).toBe(heroesMock.length + 1);
      expect(heroes.some((h) => h.name === 'TestHero')).toBe(true);
    });
  });

  describe('Execute PUT /api/heroes/:id', () => {
    it('should edit an existing hero', async () => {
      await firstValueFrom(http.put('/api/heroes/1', { name: 'Spider-Man Updated' }));
      const hero = await firstValueFrom(http.get<Hero>('/api/heroes/1'));
      expect(hero.name).toBe('Spider-Man Updated');
    });
  });

  describe('Execute DELETE /api/heroes/:id', () => {
    it('should remove a hero', async () => {
      await firstValueFrom(http.delete('/api/heroes/1'));
      const heroes = await firstValueFrom(http.get<Hero[]>('/api/heroes'));
      expect(heroes.length).toBe(heroesMock.length - 1);
      expect(heroes.some((h) => h.id === 1)).toBe(false);
    });
  });
});
