import { Franchise } from '../types/franchise.type';

export interface Hero {
  id: number;
  name: string;
  franchise: Franchise;
  description: string;
}
