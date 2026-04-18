import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeroesApi } from '../../../api/heroes.api';
import { Hero } from '../../../models/hero.model';
import { LoadingService } from '../../../services/loading/loading.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { HeroesTable } from './heroes.table';

describe('HeroesTable', () => {
  let component: HeroesTable;
  let fixture: ComponentFixture<HeroesTable>;

  const mockHeroesApi = {
    deleteHero: vi.fn(),
  };

  const mockNotificationService = {
    showError: vi.fn(),
    showSuccess: vi.fn(),
  };

  const mockDialog = {
    open: vi.fn(),
  };

  beforeEach(async () => {
    mockHeroesApi.deleteHero.mockReset();
    mockNotificationService.showError.mockReset();
    mockNotificationService.showSuccess.mockReset();
    mockDialog.open.mockReset();

    await TestBed.configureTestingModule({
      imports: [HeroesTable, MatTableModule, MatButtonModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        Router,
        { provide: HeroesApi, useValue: mockHeroesApi },
        { provide: NotificationService, useValue: mockNotificationService },
        LoadingService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Execute onDelete', () => {
    const hero: Hero = { id: 1, name: 'Superman', franchise: 'DC', description: '' };

    it('should show success notification and emit deleted after successful deletion', () => {
      mockDialog.open.mockReturnValue({ afterClosed: () => of(true) } as MatDialogRef<unknown>);
      mockHeroesApi.deleteHero.mockReturnValue(of(undefined));
      const deletedSpy = vi.spyOn(component.deleted, 'emit');

      component.onDelete(hero);

      expect(mockHeroesApi.deleteHero).toHaveBeenCalledWith(1);
      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Hero deleted successfully');
      expect(deletedSpy).toHaveBeenCalled();
      expect(mockNotificationService.showError).not.toHaveBeenCalled();
    });

    it('should show error notification and not emit deleted on failure', () => {
      mockDialog.open.mockReturnValue({ afterClosed: () => of(true) } as MatDialogRef<unknown>);
      mockHeroesApi.deleteHero.mockReturnValue(throwError(() => new Error('Delete failed')));
      const deletedSpy = vi.spyOn(component.deleted, 'emit');

      component.onDelete(hero);

      expect(mockNotificationService.showError).toHaveBeenCalledWith('Failed to delete the hero');
      expect(deletedSpy).not.toHaveBeenCalled();
    });

    it('should not call deleteHero when dialog is cancelled', () => {
      mockDialog.open.mockReturnValue({ afterClosed: () => of(false) } as MatDialogRef<unknown>);

      component.onDelete(hero);

      expect(mockHeroesApi.deleteHero).not.toHaveBeenCalled();
    });
  });
});
