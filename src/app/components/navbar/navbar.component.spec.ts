import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { PhotoServiceMock } from '../../shared/services/photo-service/mocks/photo.service.mock';
import { PhotoService } from '../../shared/services/photo-service/photo.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let mockService: ReturnType<typeof PhotoServiceMock>;

  beforeEach(async () => {
    mockService = PhotoServiceMock();

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([]), { provide: PhotoService, useValue: mockService }],
    }).compileComponents();
  });

  it('should reactively expose the favorite count from PhotoService', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;

    expect(component.favoriteCount()).toBe(0);

    mockService.__setFavorites([1, 2, 3, 4, 5]);
    expect(component.favoriteCount()).toBe(5);

    mockService.__setFavorites([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(component.favoriteCount()).toBe(12);
  });

  it('should be connected to PhotoService via the Angular Injector', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const injectedService = fixture.debugElement.injector.get(PhotoService);

    expect(injectedService).toBe(mockService);
  });
});
