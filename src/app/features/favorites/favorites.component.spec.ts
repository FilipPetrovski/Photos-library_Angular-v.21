import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PhotoServiceMock } from '../../shared/services/photo-service/mocks/photo.service.mock';
import { PhotoService } from '../../shared/services/photo-service/photo.service';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let mockService: ReturnType<typeof PhotoServiceMock>;

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    mockService = PhotoServiceMock();

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: PhotoService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  it('should reactively expose favorites from PhotoService', () => {
    const fixture = TestBed.createComponent(FavoritesComponent);
    const component = fixture.componentInstance;

    mockService.__setFavorites([1]);
    expect(component.favorites()).toEqual([{ id: 1, url: 'http://test/1.jpg' }]);

    mockService.__setFavorites([]);
    expect(component.favorites()).toEqual([]);
  });

  it('should delegate toggleFavorite logic to PhotoService', () => {
    const fixture = TestBed.createComponent(FavoritesComponent);
    const component = fixture.componentInstance;
    const testId = 123;

    component.toggleFavorite(testId);

    expect(mockService.toggleFavorite).toHaveBeenCalledWith(testId);
  });

  it('should trigger navigation with correct parameters in goToDetails', () => {
    const fixture = TestBed.createComponent(FavoritesComponent);
    const component = fixture.componentInstance;
    const testId = 456;

    component.goToDetails(testId);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/photos', testId]);
  });
});
