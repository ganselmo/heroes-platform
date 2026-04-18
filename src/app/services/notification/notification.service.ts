import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_DURATION = 4000;

@Injectable()
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  showError(message: string, duration = DEFAULT_DURATION): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-error'],
    });
  }

  showSuccess(message: string, duration = DEFAULT_DURATION): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-success'],
    });
  }
}
