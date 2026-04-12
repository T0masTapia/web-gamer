import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../services/favorites'; // Ajusta la ruta
import { GameCardComponent } from '../../components/game-card/game-card';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterModule, GameCardComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css', // Si quieres añadir estilos específicos
})
export class FavoritesPageComponent {
  sidebarOpen: any;
  onSidebarToggle($event: boolean) {
    throw new Error('Method not implemented.');
  }
  private favService = inject(FavoritesService);

  // Obtenemos el signal de favoritos del servicio
  // Al ser un signal, si quitas un corazón en la card, 
  // este componente se actualiza automáticamente.
  favs = this.favService.favorites;
}