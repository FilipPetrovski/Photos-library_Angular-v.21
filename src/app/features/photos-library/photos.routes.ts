import { Routes } from '@angular/router';

export const PHOTO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./photos-library.component').then((m) => m.PhotosLibraryComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/photo-details/photo-details.component').then(
        (m) => m.PhotoDetailsComponent,
      ),
  },
];
