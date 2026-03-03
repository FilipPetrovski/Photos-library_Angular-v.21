import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

let observerCallback: (entries: any[]) => void;

(globalThis as any).IntersectionObserver = class {
  constructor(callback: any) {
    observerCallback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

@Component({
  standalone: true,
  imports: [InfiniteScrollDirective],
  template: `<div plInfiniteScroll (scrolled)="onScrolled()"></div>`,
})
class TestComponent {
  onScrolled = vi.fn();
}

describe('InfiniteScrollDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, InfiniteScrollDirective],
    }).compileComponents();
  });

  it('should initialize IntersectionObserver with correct configuration', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const directiveEl = fixture.nativeElement.querySelector('[plInfiniteScroll]');

    const spy = vi.spyOn(globalThis, 'IntersectionObserver');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }),
    );
  });

  it('should call observe on the native element', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const directiveEl = fixture.nativeElement.querySelector('[plInfiniteScroll]');

    fixture.detectChanges();
    const instance = (globalThis as any).IntersectionObserver.prototype;

    const observerInstance = vi.mocked(globalThis.IntersectionObserver).mock.results[0].value;
    expect(observerInstance.observe).toHaveBeenCalledWith(directiveEl);
  });

  it('should emit scrolled output when entry is intersecting', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    observerCallback([{ isIntersecting: true }]);

    expect(component.onScrolled).toHaveBeenCalled();
  });

  it('should NOT emit scrolled output when entry is NOT intersecting', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    observerCallback([{ isIntersecting: false }]);

    expect(component.onScrolled).not.toHaveBeenCalled();
  });

  it('should disconnect the observer on destroy', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const observerInstance = vi.mocked(globalThis.IntersectionObserver).mock.results[0].value;
    fixture.destroy();

    expect(observerInstance.disconnect).toHaveBeenCalled();
  });
});
