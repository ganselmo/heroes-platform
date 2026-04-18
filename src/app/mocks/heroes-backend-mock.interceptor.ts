import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { heroesMock } from '../mocks/heroes.mock';
import { Hero } from '../models/hero.model';
import { HeroesPaginatedResponse } from '../models/paginated-response.model';

let allHeroes: Hero[] = [...heroesMock];
let idCounter = heroesMock.length;
export const heroesBackendMockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;

  if (url.startsWith('/api/heroes') && method === 'GET' && !url.match(/\/api\/heroes\/\d+/)) {
    const filterParam = req.params.get('filter') || '';
    const page = Number(req.params.get('page') ?? 0);
    const pageSize = Number(req.params.get('pageSize') ?? 0);

    const filtered = filterParam
      ? allHeroes.filter((hero) => hero.name.toLowerCase().includes(filterParam.toLowerCase()))
      : [...allHeroes];

    const items = pageSize > 0 ? filtered.slice(page * pageSize, page * pageSize + pageSize) : filtered;

    const response: HeroesPaginatedResponse = {
      items,
      total: filtered.length,
      page,
      pageSize,
    };

    return of(new HttpResponse({ status: 200, body: response })).pipe(delay(300));
  }

  if (url.match(/\/api\/heroes\/\d+/) && method === 'GET') {
    const id = Number(url.split('/').pop());
    const hero = allHeroes.find((hero) => hero.id === id);
    if (!hero) {
      return of(new HttpResponse({ status: 404, body: null })).pipe(delay(1000));
    }
    return of(new HttpResponse({ status: 200, body: hero })).pipe(delay(1000));
  }

  if (url === '/api/heroes' && method === 'POST') {
    idCounter++;
    const newHero: Hero = { id: idCounter, description: '', ...(body as CreateHeroDTO) };
    allHeroes = [...allHeroes, newHero];
    return of(new HttpResponse({ status: 201, body: null })).pipe(delay(1000));
  }

  if (url.match(/\/api\/heroes\/\d+/) && method === 'PUT') {
    const id = Number(url.split('/').pop());
    const heroToEdit = allHeroes.find((hero) => hero.id === id);
    const edited = Object.assign({}, heroToEdit, body);
    allHeroes = allHeroes.map((hero) => (hero.id === id ? edited : hero));
    return of(new HttpResponse({ status: 200, body: null })).pipe(delay(1000));
  }

  if (url.match(/\/api\/heroes\/\d+/) && method === 'DELETE') {
    const id = Number(url.split('/').pop());
    allHeroes = allHeroes.filter((hero) => hero.id !== id);
    return of(new HttpResponse({ status: 200, body: null })).pipe(delay(1000));
  }
  return next(req);
};

export function resetMockBackend(): void {
  allHeroes = [...heroesMock];
  idCounter = heroesMock.length;
}
