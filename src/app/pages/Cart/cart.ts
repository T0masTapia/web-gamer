import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Router, RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from "../../layouts/sidebar/sidebar";
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule], // No olvides RouterModule para el botón volver
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartPageComponent {
  private cartService = inject(CartService);
  private libraryService = inject(LibraryService);
  private router = inject(Router);
  
  sidebarOpen = true;
  cart = this.cartService.items;
  total = this.cartService.total;

  onSidebarToggle(isOpen: boolean) {
    this.sidebarOpen = isOpen;
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  checkout() {
    const itemsParaComprar = this.cart();

    if (itemsParaComprar.length > 0) {
      // 1. Mandamos los juegos del carrito a la biblioteca persistente
      this.libraryService.addToLibrary(itemsParaComprar);
      
      // 2. Limpiamos el carrito (usando la función de tu servicio)
      this.cartService.clearCart();
      
      // 3. Opcional: Un pequeño aviso de éxito
      console.log('Compra procesada con éxito');

      // 4. Redirigimos al perfil para ver los juegos en la biblioteca
      this.router.navigate(['/perfil']);
    }
  }
}