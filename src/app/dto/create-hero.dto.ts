import { Franchise } from '../types/franchise.type';

export interface CreateHeroDTO {
  name: string;
  franchise: Franchise;
  description?: string;
}
