import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-delete-hero-dialog',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './delete-hero-dialog.html',
  styleUrl: './delete-hero-dialog.scss',
})
export class DeleteHeroDialog {
  private readonly dialogRef = inject(MatDialogRef<DeleteHeroDialog>);
  private readonly data = inject<{ hero: Hero }>(MAT_DIALOG_DATA);
  protected readonly hero = signal<Hero>(this.data.hero);

  onCancel(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
