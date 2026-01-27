import { Component, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { HeroesApi } from '../../api/heroes.api';
import { Hero } from '../../models/hero.model';
import { LoadingService } from '../../services/loading/loading.service';
import { DeleteHeroDialog } from '../delete-hero-dialog/delete-hero-dialog';

@Component({
  selector: 'app-heroes-table',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './heroes.table.html',
  styleUrl: './heroes.table.scss',
})
export class HeroesTable {
  heroes = input<Hero[]>([]);
  protected readonly headerRowDefinition = ['id', 'name', 'franchise', 'description', 'action'];

  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly loadingService: LoadingService = inject(LoadingService);

  protected tableData: Hero[] = [];

  constructor(private heroesApi: HeroesApi) {
    effect(() => {
      this.tableData = this.heroes();
    });
  }
  onEdit({ id }: Hero) {
    this.router.navigateByUrl(`edit/${id}`);
  }

  onDelete(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteHeroDialog, {
      data: { hero },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.loadingService.show();
          this.heroesApi
            .deleteHero(hero.id)
            .pipe(finalize(() => this.loadingService.hide()))
            .subscribe();
        }
      });
  }
}
