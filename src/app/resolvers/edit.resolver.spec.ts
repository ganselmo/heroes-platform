import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { editResolver } from './edit.resolver';

describe('editResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => editResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
