import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { HeroesApi } from '../../../api/heroes.api';
import { LoadingService } from '../../../services/loading/loading.service';
import { HeroesTable } from './heroes.table';

describe('HeroesTable', () => {
  let component: HeroesTable;
  let fixture: ComponentFixture<HeroesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesTable, MatTableModule, MatButtonModule],
      providers: [MatDialog, Router, HeroesApi, LoadingService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
