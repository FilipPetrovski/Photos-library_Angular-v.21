import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BaseLayoutComponent } from './base-layout.component';

describe('BaseLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should be successfully instantiated', () => {
    const fixture = TestBed.createComponent(BaseLayoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
