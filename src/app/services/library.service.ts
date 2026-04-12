import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private _library = signal<any[]>(this.loadFromStorage());
  games = this._library.asReadonly();

  private loadFromStorage(): any[] {
    const data = localStorage.getItem('my_library');
    return data ? JSON.parse(data) : [];
  }

  // Esta función se llamará cuando el usuario "compre" el carrito
  addToLibrary(newGames: any[]) {
    const current = this._library();
    // Combinamos lo que ya tenemos con lo nuevo (evitando duplicados)
    const updated = [...current, ...newGames.filter(ng => !current.some(cg => cg.id === ng.id))];
    
    this._library.set(updated);
    localStorage.setItem('my_library', JSON.stringify(updated));
  }
}