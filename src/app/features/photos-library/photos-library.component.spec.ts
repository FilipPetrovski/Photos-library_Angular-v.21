import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';
import { PhotoServiceMock } from '../../shared/services/photo-service/mocks/photo.service.mock';
import { PhotoService } from '../../shared/services/photo-service/photo.service';
import { PhotosLibraryComponent } from './photos-library.component';

(globalThis as any).IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

describe('PhotosLibraryComponent', () => {
  let mockService: ReturnType<typeof PhotoServiceMock>;

  beforeEach(async () => {
    mockService = PhotoServiceMock();

    await TestBed.configureTestingModule({
      imports: [PhotosLibraryComponent, InfiniteScrollDirective],
      providers: [{ provide: PhotoService, useValue: mockService }],
    }).compileComponents();
  });

  it('should call loadMore on ngOnInit if photos are empty', () => {
    mockService.__setPhotos([]);
    const fixture = TestBed.createComponent(PhotosLibraryComponent);
    fixture.detectChanges();

    expect(mockService.loadMore).toHaveBeenCalledTimes(1);
  });

  it('should NOT call loadMore on ngOnInit if photos already exist', () => {
    mockService.__setPhotos([{ id: 1, url: 'test.jpg' }]);
    const fixture = TestBed.createComponent(PhotosLibraryComponent);
    fixture.detectChanges();

    expect(mockService.loadMore).not.toHaveBeenCalled();
  });

  it('should reflect the isLoading state from the service signal', () => {
    const fixture = TestBed.createComponent(PhotosLibraryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    mockService.__setLoading(true);
    expect(component.isLoading()).toBe(true);

    mockService.__setLoading(false);
    expect(component.isLoading()).toBe(false);
  });

  it('should call loadMore when infinite scroll emits scrolled event', () => {
    const fixture = TestBed.createComponent(PhotosLibraryComponent);
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
    const directiveInstance = directiveEl.injector.get(InfiniteScrollDirective);

    directiveInstance.scrolled.emit();

    expect(mockService.loadMore).toHaveBeenCalled();
  });

  it('should delegate toggleFavorite and isFavorite to the service', () => {
    const fixture = TestBed.createComponent(PhotosLibraryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const testId = 55;

    component.toggleFavorite(testId);
    expect(mockService.toggleFavorite).toHaveBeenCalledWith(testId);

    mockService.__setFavorites([testId]);
    expect(component.isFavorite(testId)).toBe(true);
  });

  it('should trigger loadMore when the loadMore method is called manually', () => {
    const fixture = TestBed.createComponent(PhotosLibraryComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.loadMore();
    expect(mockService.loadMore).toHaveBeenCalled();
  });
});
