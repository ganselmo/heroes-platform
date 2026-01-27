import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButton } from '@angular/material/button';
import { HeroesTablePagination } from './heroes-table-pagination';

describe('HeroesTablePagination', () => {
  let component: HeroesTablePagination;
  let fixture: ComponentFixture<HeroesTablePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesTablePagination, MatButton],
    }).compileComponents();
    fixture = TestBed.createComponent(HeroesTablePagination);
    fixture.componentRef.setInput('totalItems', 100);
    fixture.componentRef.setInput('pageSize', 10);

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
