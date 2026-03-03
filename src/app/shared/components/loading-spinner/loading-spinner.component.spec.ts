import { TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  it('should be successfully instantiated', () => {
    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a default visible value of false', () => {
    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    const component = fixture.componentInstance;

    expect(component.visible()).toBe(false);
  });

  it('should accept a true value for the visible input', () => {
    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('visible', true);

    expect(component.visible()).toBe(true);
  });

  it('should be reactive when the visible input changes', () => {
    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('visible', true);
    expect(component.visible()).toBe(true);

    fixture.componentRef.setInput('visible', false);
    expect(component.visible()).toBe(false);
  });
});
