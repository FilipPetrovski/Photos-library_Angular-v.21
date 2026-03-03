import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  const mockPhoto = { id: 101, url: 'http://test.com' };

  it('should be successfully instantiated', () => {
    const fixture = TestBed.createComponent(PhotoComponent);
    fixture.componentRef.setInput('photo', mockPhoto);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with correct signal values', () => {
    const fixture = TestBed.createComponent(PhotoComponent);
    fixture.componentRef.setInput('photo', mockPhoto);
    fixture.componentRef.setInput('isFavorite', true);

    const component = fixture.componentInstance;
    expect(component.photo()).toEqual(mockPhoto);
    expect(component.isFavorite()).toBe(true);
  });

  it('should emit photo id when onToggle is called', () => {
    const fixture = TestBed.createComponent(PhotoComponent);
    fixture.componentRef.setInput('photo', mockPhoto);
    const component = fixture.componentInstance;

    const emitSpy = vi.spyOn(component.toggle, 'emit');
    const mockEvent = {
      stopPropagation: vi.fn(),
      preventDefault: vi.fn(),
    } as unknown as MouseEvent;

    component.onToggle(mockEvent);

    expect(emitSpy).toHaveBeenCalledWith(mockPhoto.id);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should remain reactive to isFavorite signal changes', () => {
    const fixture = TestBed.createComponent(PhotoComponent);
    fixture.componentRef.setInput('photo', mockPhoto);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('isFavorite', true);
    expect(component.isFavorite()).toBe(true);

    fixture.componentRef.setInput('isFavorite', false);
    expect(component.isFavorite()).toBe(false);
  });
});
