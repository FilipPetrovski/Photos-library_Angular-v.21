import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'path',
    loadComponent: () =>
      import('./features/photos-library/photos-library.component').then(
        (m) => m.PhotosLibraryComponent,
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  { path: '', redirectTo: 'path', pathMatch: 'full' },
];
