import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  const mockSnackBar = {
    open: vi.fn(),
  };

  beforeEach(() => {
    mockSnackBar.open.mockReset();

    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: MatSnackBar, useValue: mockSnackBar }],
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Execute showError', () => {
    it('should open snackbar with error panel class and default duration', () => {
      service.showError('Something went wrong');

      expect(mockSnackBar.open).toHaveBeenCalledWith('Something went wrong', 'Close', {
        duration: 4000,
        panelClass: ['snackbar-error'],
      });
    });

    it('should open snackbar with custom duration', () => {
      service.showError('Error', 6000);

      expect(mockSnackBar.open).toHaveBeenCalledWith('Error', 'Close', {
        duration: 6000,
        panelClass: ['snackbar-error'],
      });
    });
  });

  describe('Execute showSuccess', () => {
    it('should open snackbar with success panel class and default duration', () => {
      service.showSuccess('Hero created');

      expect(mockSnackBar.open).toHaveBeenCalledWith('Hero created', 'Close', {
        duration: 4000,
        panelClass: ['snackbar-success'],
      });
    });

    it('should open snackbar with custom duration', () => {
      service.showSuccess('Done', 2000);

      expect(mockSnackBar.open).toHaveBeenCalledWith('Done', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    });
  });
});
