import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../../../../shared/services/photo-service/photo.service';

@Component({
  selector: 'pl-photo-details',
  imports: [MatButtonModule, MatIconModule, NgOptimizedImage],
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.scss',
})
export class PhotoDetailsComponent {
  private route = inject(ActivatedRoute);
  private photoService = inject(PhotoService);

  readonly photoId = signal<number>(Number(this.route.snapshot.paramMap.get('id')));

  readonly imageUrl = this.photoService.getPhotoUrl(this.photoId());
  readonly isFavorite = () => this.photoService.isFavorite(this.photoId());

  remove() {
    this.photoService.toggleFavorite(this.photoId());
  }
}
