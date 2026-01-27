import { Routes } from '@angular/router';
import { editResolver } from './resolvers/edit.resolver';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((c) => c.HomePage),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-hero/create-hero.page').then((c) => c.CreateHeroPage),
  },
  {
    path: 'edit/:id',
    resolve: { hero: editResolver },
    loadComponent: () => import('./pages/edit-hero/edit-hero.page').then((c) => c.EditHeroPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
