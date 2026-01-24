import { FormControl } from '@angular/forms';
import { Franchise } from '../types/franchise.type';

export interface HeroFormModel {
  name: FormControl<string>;
  franchise: FormControl<Franchise>;
  description: FormControl<string>;
}
