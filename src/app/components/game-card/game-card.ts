import { Component, input, inject } from '@angular/core'; // Añadimos inject
import { RouterLink } from "@angular/router";
import { FavoritesService } from '../../services/favorites';
@Component({
  selector: 'game-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCardComponent {
  private favService = inject(FavoritesService);

  id = input.required<number>();
  title = input.required<string>();
  platform = input.required<string>();
  img = input.required<string>();

  // Función para el botón del corazón
  toggleFav(event: Event) {
    event.stopPropagation(); // Evita que se abra el detalle al hacer clic al corazón
    this.favService.toggleFavorite({
      id: this.id(),
      title: this.title(),
      platform: this.platform(),
      img: this.img()
    });
  }

  // Comprueba si este juego es favorito para pintar el corazón
  get isFav(): boolean {
    return this.favService.isFavorite(this.id());
  }
}