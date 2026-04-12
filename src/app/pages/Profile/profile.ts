import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfilePageComponent {
  private authService = inject(AuthService);
  private favService = inject(FavoritesService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private libraryService = inject(LibraryService);

  sidebarOpen = true;

  // Traemos los datos reales de los servicios
  user = this.authService.user; // Datos del login
  favorites = this.favService.favorites; // Signal de favoritos
  cartCount = this.cartService.count; // Signal del carrito
  library = this.libraryService.games;

  activeTab: 'favoritos' | 'biblioteca' = 'biblioteca';

  setTab(tab: 'favoritos' | 'biblioteca') {
    this.activeTab = tab;
  }

  eliminarFavorito(game: any) {
    this.favService.toggleFavorite(game);
  }

  logout() {
    this.authService.logout();
  }

  onSidebarToggle(opened: boolean) {
    this.sidebarOpen = opened;
  }
}