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
});
