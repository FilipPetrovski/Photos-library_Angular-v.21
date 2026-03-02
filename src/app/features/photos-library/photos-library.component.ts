import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PhotoService } from '../../shared/services/photo.service';

@Component({
  selector: 'pl-photos-library',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './photos-library.component.html',
  styleUrl: './photos-library.component.scss',
})
export class PhotosLibraryComponent implements OnInit {
  private photoService = inject(PhotoService); // Private service

  // Expose data as local read-only properties
  readonly photos = this.photoService.photos;
  readonly isLoading = this.photoService.isLoading;

  ngOnInit() {
    // Service handles initial load logic internally or here
    if (this.photos().length === 0) {
      this.photoService.loadMore();
    }
  }

  // Wrapper methods for actions
  toggleFavorite(id: number) {
    this.photoService.toggleFavorite(id);
  }

  isFavorite(id: number): boolean {
    return this.photoService.isFavorite(id);
  }

  loadMore() {
    this.photoService.loadMore();
  }
}
