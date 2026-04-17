import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Hero } from '../models/hero.model';
import { HeroesPaginatedResponse } from '../models/paginated-response.model';
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
    it('should return all heroes when no pagination params', async () => {
      const res = await firstValueFrom(http.get<HeroesPaginatedResponse>('/api/heroes'));
      expect(res.total).toBe(heroesMock.length);
      expect(res.items.length).toBe(heroesMock.length);
    });

    it('should return paginated heroes', async () => {
      const res = await firstValueFrom(
        http.get<HeroesPaginatedResponse>('/api/heroes', { params: { page: 0, pageSize: 5 } }),
      );
      expect(res.items.length).toBe(5);
      expect(res.total).toBe(heroesMock.length);
      expect(res.page).toBe(0);
      expect(res.pageSize).toBe(5);
    });

    it('should return second page of paginated heroes', async () => {
      const res = await firstValueFrom(
        http.get<HeroesPaginatedResponse>('/api/heroes', { params: { page: 1, pageSize: 10 } }),
      );
      expect(res.items.length).toBe(10);
      expect(res.total).toBe(heroesMock.length);
      expect(res.page).toBe(1);
    });

    it('should return partial last page', async () => {
      const lastPage = Math.floor(heroesMock.length / 10);
      const expectedItems = heroesMock.length % 10;
      const res = await firstValueFrom(
        http.get<HeroesPaginatedResponse>('/api/heroes', {
          params: { page: lastPage, pageSize: 10 },
        }),
      );
      expect(res.items.length).toBe(expectedItems);
      expect(res.total).toBe(heroesMock.length);
    });

    it('should filter heroes by query param', async () => {
      const res = await firstValueFrom(
        http.get<HeroesPaginatedResponse>('/api/heroes', {
          params: { filter: 'Spider', page: 0, pageSize: 10 },
        }),
      );
      expect(res.items.length).toBeGreaterThan(0);
      expect(res.items.every((hero) => hero.name.toLowerCase().includes('spider'))).toBe(true);
      expect(res.total).toBe(res.items.length);
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
      const res = await firstValueFrom(http.get<HeroesPaginatedResponse>('/api/heroes'));
      expect(res.total).toBe(heroesMock.length + 1);
      expect(res.items.some((hero) => hero.name === 'TestHero')).toBe(true);
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
      const res = await firstValueFrom(http.get<HeroesPaginatedResponse>('/api/heroes'));
      expect(res.total).toBe(heroesMock.length - 1);
      expect(res.items.some((hero) => hero.id === 1)).toBe(false);
    });
  });
});
