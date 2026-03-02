import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private readonly itemsPerPage = 12;
  private currentIdOffset = 0;

  private photosSignal = signal<{ id: number; url: string }[]>([]);
  private favoritesSignal = signal<Set<number>>(new Set());
  private loadingSignal = signal<boolean>(false);

  readonly photos = this.photosSignal.asReadonly();
  readonly isLoading = this.loadingSignal.asReadonly();

  readonly favoritePhotos = computed(() =>
    this.photosSignal().filter((p) => this.favoritesSignal().has(p.id)),
  );

  readonly favoritePhotosCount = computed(() => this.favoritePhotos().length);

  constructor() {
    this.loadMore();
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
        url: `https://picsum.photos/id/${id}/200/300`,
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
}
