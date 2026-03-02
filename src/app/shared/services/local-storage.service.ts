import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'favorite_ids';

  getFavorites(): number[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveFavorites(ids: number[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
  }
}
