import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  // Usamos un Signal para que la UI se actualice automáticamente
  private cartItems = signal<any[]>(this.loadFromStorage());

  // Propiedades computadas (se actualizan solas cuando cambia cartItems)
  items = this.cartItems.asReadonly();
  
  total = computed(() => 
    this.cartItems().reduce((acc, item) => acc + (item.price || 0), 0)
  );

  count = computed(() => this.cartItems().length);

  private loadFromStorage(): any[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

  addToCart(game: any) {
    // Evitar duplicados
    if (!this.cartItems().find(g => g.id === game.id)) {
      const updatedCart = [...this.cartItems(), game];
      this.cartItems.set(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  removeFromCart(gameId: number) {
    const updatedCart = this.cartItems().filter(g => g.id !== gameId);
    this.cartItems.set(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }
}