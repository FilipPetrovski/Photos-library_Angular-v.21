import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'photos',
    loadChildren: () =>
      import('./features/photos-library/photos.routes').then((m) => m.PHOTO_ROUTES),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: '**', redirectTo: 'photos' },
];
