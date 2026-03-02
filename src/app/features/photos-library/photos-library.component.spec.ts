import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosLibraryComponent } from './photos-library.component';

describe('PhotosLibraryComponent', () => {
  let component: PhotosLibraryComponent;
  let fixture: ComponentFixture<PhotosLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotosLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosLibraryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
