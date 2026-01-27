import { Component, effect, input, output } from '@angular/core';
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
  readonly initialFilterValue = input<string | null>(null);
  protected filterValue = output<string>();
  protected resetFilterValue = output();

  filterControl: FormControl<string | null> = new FormControl<string>('');

  constructor() {
    effect(() => {
      const filter = this.initialFilterValue();

      if (!filter) return;

      this.filterControl.patchValue(filter, { emitEvent: false });
    });

    this.filterControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      value ? this.filterValue.emit(value) : this.resetFilterValue.emit();
    });
  }

  reset(): void {
    this.filterControl.setValue('', { emitEvent: false });
    this.resetFilterValue.emit();
  }
}
