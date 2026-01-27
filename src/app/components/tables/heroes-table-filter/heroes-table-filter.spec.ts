import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeroesTableFilter } from './heroes-table-filter';

describe('HeroesTableFilter', () => {
  let component: HeroesTableFilter;
  let fixture: ComponentFixture<HeroesTableFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroesTableFilter,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesTableFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
