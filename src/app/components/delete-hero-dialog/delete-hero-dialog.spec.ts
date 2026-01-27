import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Hero } from '../../models/hero.model';
import { DeleteHeroDialog } from './delete-hero-dialog';

describe('DeleteHeroDialog Component', () => {
  let component: DeleteHeroDialog;
  let fixture: ComponentFixture<DeleteHeroDialog>;

  const mockDialogRef = {
    close: vi.fn(),
  };

  const mockHero: Hero = {
    id: 1,
    name: 'Wolverine',
    franchise: 'Marvel',
    description: 'Angry mutant',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroDialog],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { hero: mockHero } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteHeroDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Dialog Behaviour', () => {
    it('should create and show the hero name', () => {
      expect(component).toBeTruthy();
      expect(component['hero']().name).toBe('Wolverine');
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('mat-dialog-content p')?.textContent).toContain('Wolverine');
    });

    it('should close with false when onCancel is called', () => {
      component.onCancel();
      expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    });

    it('should close with true when onConfirm is called', () => {
      component.onConfirm();
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('UI Interaction', () => {
    it('should call onCancel when Cancel button is clicked', () => {
      const spy = vi.spyOn(component, 'onCancel');
      const cancelButton = fixture.debugElement.query(By.css('button:nth-child(1)'));
      cancelButton.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalled();
    });

    it('should call onConfirm when Ok button is clicked', () => {
      const spy = vi.spyOn(component, 'onConfirm');
      const okButton = fixture.debugElement.query(By.css('button:nth-child(2)'));
      okButton.triggerEventHandler('click', null);
      expect(spy).toHaveBeenCalled();
    });
  });
});
