import { Routes } from '@angular/router';
import { CreateHeroPage } from './pages/create-hero/create-hero.page';
import { EditHeroPage } from './pages/edit-hero/edit-hero.page';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'create',
    component: CreateHeroPage,
  },
  {
    path: 'edit/:id',
    component: EditHeroPage,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
