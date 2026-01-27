import { TestBed } from '@angular/core/testing';

import { HeroesStateService } from './heroes-state.service';

describe('HeroesState', () => {
  let service: HeroesStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesStateService],
    });

    service = TestBed.inject(HeroesStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
