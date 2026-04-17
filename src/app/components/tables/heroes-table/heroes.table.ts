import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { HeroesApi } from '../../../api/heroes.api';
import { Hero } from '../../../models/hero.model';
import { DeleteHeroDialog } from '../../dialogs/delete-hero-dialog/delete-hero-dialog';

@Component({
  selector: 'app-heroes-table',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './heroes.table.html',
  styleUrl: './heroes.table.scss',
})
export class HeroesTable {
  deleted = output<void>();
  heroes = input<Hero[]>([]);
  protected readonly headerRowDefinition = ['id', 'name', 'franchise', 'description', 'action'];
  private readonly heroesApi: HeroesApi = inject(HeroesApi);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  onEdit({ id }: Hero) {
    this.router.navigateByUrl(`edit/${id}`);
  }

  onDelete(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteHeroDialog, {
      data: { hero },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((confirmed) => !!confirmed),
        switchMap(() => this.heroesApi.deleteHero(hero.id)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.deleted.emit());
  }
}
