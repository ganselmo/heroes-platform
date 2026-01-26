import { Routes } from '@angular/router';
import { CreateHeroPage } from './pages/create-hero/create-hero.page';
import { EditHeroPage } from './pages/edit-hero/edit-hero.page';
import { HomePage } from './pages/home/home.page';
import { editResolver } from './resolvers/edit.resolver';

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
    resolve: { hero: editResolver },
    component: EditHeroPage,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
