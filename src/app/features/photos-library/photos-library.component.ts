import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PhotoService } from '../../shared/services/photo.service';

@Component({
  selector: 'pl-photos-library',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, LoadingSpinnerComponent],
  templateUrl: './photos-library.component.html',
  styleUrl: './photos-library.component.scss',
})
export class PhotosLibraryComponent implements OnInit {
  private photoService = inject(PhotoService);

  readonly photos = this.photoService.photos;
  readonly isLoading = this.photoService.isLoading;

  ngOnInit() {
    if (this.photos().length === 0) {
      this.photoService.loadMore();
    }
  }

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
