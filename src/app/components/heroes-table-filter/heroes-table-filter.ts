import { Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-heroes-table-filter',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './heroes-table-filter.html',
  styleUrl: './heroes-table-filter.scss',
})
export class HeroesTableFilter {
  protected filterValue = output<string>();
  protected resetFilterValue = output();

  filterControl: FormControl<string | null> = new FormControl<string>('');

  constructor() {
    this.filterControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      value ? this.filterValue.emit(value) : this.resetFilterValue.emit();
    });
  }

  reset(): void {
    this.filterControl.setValue('', { emitEvent: false });
    this.resetFilterValue.emit();
  }
}
