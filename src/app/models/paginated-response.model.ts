import { Hero } from './hero.model';

export interface HeroesPaginatedResponse {
  items: Hero[];
  total: number;
  page: number;
  pageSize: number;
}
