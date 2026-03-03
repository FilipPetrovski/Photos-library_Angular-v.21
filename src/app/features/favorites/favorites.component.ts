import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { PhotoService } from '../../shared/services/photo-service/photo.service';

@Component({
  selector: 'pl-favorites',
  standalone: true,
  imports: [MatIconModule, PhotoComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private photoService = inject(PhotoService);
  private router = inject(Router);

  readonly favorites = this.photoService.favoritePhotos;

  toggleFavorite(id: number) {
    this.photoService.toggleFavorite(id);
  }

  goToDetails(id: number) {
    this.router.navigate(['/photos', id]);
  }
}
