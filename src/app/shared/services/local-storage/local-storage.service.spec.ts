import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const STORAGE_KEY = 'favorite_ids';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);

    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it('should return an empty array if no data exists in localStorage', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);

    const result = service.getFavorites();

    expect(result).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('should parse and return numbers from localStorage', () => {
    const mockData = JSON.stringify([1, 2, 3]);
    vi.mocked(localStorage.getItem).mockReturnValue(mockData);

    const result = service.getFavorites();

    expect(result).toEqual([1, 2, 3]);
  });

  it('should stringify and save the ID array to localStorage', () => {
    const testIds = [10, 20];

    service.saveFavorites(testIds);

    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(testIds));
  });

  it('should overwrite existing data when saving new favorites', () => {
    const initialIds = [1];
    service.saveFavorites(initialIds);

    const newIds = [1, 2, 3];
    service.saveFavorites(newIds);

    expect(localStorage.setItem).toHaveBeenLastCalledWith(STORAGE_KEY, JSON.stringify(newIds));
  });
});
