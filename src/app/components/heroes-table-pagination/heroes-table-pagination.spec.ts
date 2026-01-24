import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesTablePagination } from './heroes-table-pagination';

describe('HeroesTablePagination', () => {
  let component: HeroesTablePagination;
  let fixture: ComponentFixture<HeroesTablePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesTablePagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesTablePagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
