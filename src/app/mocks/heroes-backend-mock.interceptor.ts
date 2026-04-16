import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { CreateHeroDTO } from '../dto/create-hero.dto';
import { heroesMock } from '../mocks/heroes.mock';
import { Hero } from '../models/hero.model';
let allHeroes: Hero[] = [...heroesMock];
let idCounter = heroesMock.length;
export const heroesBackendMockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;

  if (url.startsWith('/api/heroes') && method === 'GET' && !url.match(/\/api\/heroes\/\d+/)) {
    const filterParam = req.params.get('filter') || '';
    const filtered = filterParam
      ? allHeroes.filter((hero) => hero.name.toLowerCase().includes(filterParam.toLowerCase()))
      : [...allHeroes];
    return of(new HttpResponse({ status: 200, body: filtered })).pipe(delay(300));
  }

  if (url.match(/\/api\/heroes\/\d+/) && method === 'GET') {
    const id = Number(url.split('/').pop());
    const hero = allHeroes.find((hero) => hero.id === id);
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
