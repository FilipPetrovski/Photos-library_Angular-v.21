import { computed, signal } from '@angular/core';
import { vi } from 'vitest';
import { Photo } from '../../../../features/photos-library/models/photo.interface';

export const PhotoServiceMock = () => {
  const _photos = signal<Photo[]>([]);
  const _favorites = signal<Set<number>>(new Set());
  const _loading = signal(false);

  return {
    photos: _photos.asReadonly(),
    isLoading: _loading.asReadonly(),

    favoritePhotos: computed(() =>
      Array.from(_favorites()).map((id) => ({ id, url: `http://test/${id}.jpg` })),
    ),
    favoritePhotosCount: computed(() => _favorites().size),

    loadMore: vi.fn(),
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn((id: number) => _favorites().has(id)),
    getPhotoUrl: vi.fn((id: number) => `http://test/${id}.jpg`),

    __setPhotos: (photos: Photo[]) => _photos.set(photos),
    __setFavorites: (ids: number[] = [1, 2, 3, 4, 5]) => _favorites.set(new Set(ids)),
    __setLoading: (val: boolean) => _loading.set(val),
  };
};
