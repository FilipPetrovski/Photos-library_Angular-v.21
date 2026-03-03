import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PhotoServiceMock } from '../../../../shared/services/photo-service/mocks/photo.service.mock';
import { PhotoService } from '../../../../shared/services/photo-service/photo.service';
import { PhotoDetailsComponent } from './photo-details.component';

describe('PhotoDetailsComponent', () => {
  const mockId = '123';
  let mockService: ReturnType<typeof PhotoServiceMock>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: vi.fn().mockReturnValue(mockId),
      },
    },
  };

  beforeEach(() => {
    mockService = PhotoServiceMock();

    TestBed.configureTestingModule({
      providers: [
        PhotoDetailsComponent,
        { provide: PhotoService, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
  });

  it('should initialize photoId by parsing the route snapshot', () => {
    const component = TestBed.inject(PhotoDetailsComponent);

    expect(component.photoId()).toBe(123);
    expect(mockActivatedRoute.snapshot.paramMap.get).toBeCalledWith('id');
  });

  it('should resolve the correct imageUrl based on photoId', () => {
    const component = TestBed.inject(PhotoDetailsComponent);

    expect(component.imageUrl).toBe('http://test/123.jpg');
    expect(mockService.getPhotoUrl).toHaveBeenCalledWith(123);
  });

  it('should determine isFavorite status via the reactive mock signal', () => {
    const component = TestBed.inject(PhotoDetailsComponent);

    mockService.__setFavorites([123]);
    expect(component.isFavorite()).toBe(true);

    mockService.__setFavorites([]);
    expect(component.isFavorite()).toBe(false);
  });

  it('should call toggleFavorite on the service when remove() is invoked', () => {
    const component = TestBed.inject(PhotoDetailsComponent);

    component.remove();

    expect(mockService.toggleFavorite).toHaveBeenCalledWith(123);
  });
});
