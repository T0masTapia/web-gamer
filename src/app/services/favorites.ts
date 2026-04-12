import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // Usamos un 'signal' para que toda la app se entere cuando cambien los favoritos
  private _favorites = signal<any[]>(this.loadFromStorage());

  favorites = this._favorites.asReadonly();

  private loadFromStorage(): any[] {
    const data = localStorage.getItem('my_favorites');
    return data ? JSON.parse(data) : [];
  }

  toggleFavorite(game: any) {
    const current = this._favorites();
    const index = current.findIndex(g => g.id === game.id);

    if (index > -1) {
      // Si ya existe, lo quitamos
      current.splice(index, 1);
    } else {
      // Si no existe, lo añadimos
      current.push(game);
    }

    this._favorites.set([...current]);
    localStorage.setItem('my_favorites', JSON.stringify(current));
  }

  isFavorite(id: number | string): boolean {
    return this._favorites().some(g => g.id === id);
  }
}