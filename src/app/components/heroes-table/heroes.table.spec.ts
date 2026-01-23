import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesTable } from './heroes.table';

describe('HeroesTable', () => {
  let component: HeroesTable;
  let fixture: ComponentFixture<HeroesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
