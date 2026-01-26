import { Franchise } from '../types/franchise.type';

export interface EditHeroDTO {
  name?: string;
  franchise?: Franchise;
  description?: string;
}
