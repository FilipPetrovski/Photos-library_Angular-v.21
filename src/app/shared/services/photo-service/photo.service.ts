import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Photo } from '../../../features/photos-library/models/photo.interface';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private storageService = inject(LocalStorageService);

  private readonly itemsPerPage = 12;
  private currentIdOffset = 0;

  private photosSignal = signal<Photo[]>([]);

  private favoritesSignal = signal<Set<number>>(new Set(this.storageService.getFavorites()));
  private loadingSignal = signal<boolean>(false);

  readonly photos = this.photosSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();

  readonly favoritePhotos = computed(() => {
    const ids = Array.from(this.favoritesSignal());

    return ids.map((id) => ({
      id,
      url: this.getPhotoUrl(id, 200, 300),
    }));
  });

  readonly favoritePhotosCount = computed(() => this.favoritesSignal().size);

  constructor() {
    this.loadMore();

    effect(() => {
      const ids = Array.from(this.favoritesSignal());
      this.storageService.saveFavorites(ids);
    });
  }

  async loadMore() {
    if (this.loadingSignal()) return;

    this.loadingSignal.set(true);
    const delay = Math.floor(Math.random() * 100) + 200;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const newPhotos = Array.from({ length: this.itemsPerPage }, () => {
      const id = this.currentIdOffset++;
      return {
        id,
        url: `https://picsum.photos/seed/${id}/200/300`,
      };
    });

    this.photosSignal.update((current) => [...current, ...newPhotos]);
    this.loadingSignal.set(false);
  }

  toggleFavorite(id: number) {
    this.favoritesSignal.update((set) => {
      const newSet = new Set(set);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }

  isFavorite(id: number) {
    return this.favoritesSignal().has(id);
  }

  getPhotoUrl(id: number, width = 400, height = 600): string {
    return `https://picsum.photos/seed/${id}/${width}/${height}`;
  }
}
