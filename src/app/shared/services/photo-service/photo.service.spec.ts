import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  const mockStorageService = {
    getFavorites: vi.fn().mockReturnValue([]),
    saveFavorites: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      providers: [PhotoService, { provide: LocalStorageService, useValue: mockStorageService }],
    });

    service = TestBed.inject(PhotoService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should handle pagination logic in loadMore', async () => {
    const loadPromise = service.loadMore();
    expect(service.isLoading()).toBe(true);

    vi.advanceTimersByTime(500);

    await vi.runAllTimersAsync();

    expect(service.photos().length).toBeGreaterThan(0);
    expect(service.isLoading()).toBe(false);
  });

  it('should persist favorites to storage via effect', async () => {
    service.toggleFavorite(100);

    await vi.waitFor(() => {
      expect(mockStorageService.saveFavorites).toHaveBeenCalled();
    });
  });

  it('should correctly identify if a photo is favorite', () => {
    const testId = 42;

    expect(service.isFavorite(testId)).toBe(false);

    service.toggleFavorite(testId);
    expect(service.isFavorite(testId)).toBe(true);

    service.toggleFavorite(testId);
    expect(service.isFavorite(testId)).toBe(false);
  });

  it('should compute favoritePhotos objects correctly when favorites exist', () => {
    service.toggleFavorite(1);
    service.toggleFavorite(2);

    const result = service.favoritePhotos();

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      id: 1,
      url: 'https://picsum.photos/seed/1/200/300',
    });

    expect(result[1]).toEqual({
      id: 2,
      url: 'https://picsum.photos/seed/2/200/300',
    });
  });

  it('should correctly compute favoritePhotosCount based on favoritesSignal size', () => {
    expect(service.favoritePhotosCount()).toBe(0);

    service.toggleFavorite(10);
    service.toggleFavorite(20);
    expect(service.favoritePhotosCount()).toBe(2);

    service.toggleFavorite(10);
    expect(service.favoritePhotosCount()).toBe(1);

    service.toggleFavorite(20);
    expect(service.favoritePhotosCount()).toBe(0);
  });

  it('should generate photo URLs with default and custom dimensions', () => {
    const id = 5;

    const defaultUrl = service.getPhotoUrl(id);
    expect(defaultUrl).toBe(`https://picsum.photos/seed/${id}/400/600`);

    const customUrl = service.getPhotoUrl(id, 800, 1000);
    expect(customUrl).toBe(`https://picsum.photos/seed/${id}/800/1000`);
  });

  it('should prevent multiple simultaneous loads', async () => {
    service.loadMore();
    expect(service.isLoading()).toBe(true);

    const initialPhotosCount = service.photos().length;

    await service.loadMore();

    expect(service.isLoading()).toBe(true);
    expect(service.photos().length).toBe(initialPhotosCount);

    vi.advanceTimersByTime(500);
    await vi.runAllTimersAsync();
    expect(service.isLoading()).toBe(false);
  });
});
