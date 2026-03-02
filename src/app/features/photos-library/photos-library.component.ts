import { Component, inject, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PhotoComponent } from '../../shared/components/photo/photo.component';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';
import { PhotoService } from './services/photo.service';

@Component({
  selector: 'pl-photos-library',
  standalone: true,
  imports: [LoadingSpinnerComponent, InfiniteScrollDirective, PhotoComponent],
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
