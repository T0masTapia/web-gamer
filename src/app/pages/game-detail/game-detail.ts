import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GameService } from '../../services/game';
import { GAMES } from '../../data/game'; // <--- Importa tus datos locales
import { FavoritesService } from '../../services/favorites';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetailPageComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);
  private sanitizer = inject(DomSanitizer);
  private favService = inject(FavoritesService); // Inyectamos el servicio
  private cartService = inject(CartService); //

  game: any = null;
  safeVideoUrl: SafeResourceUrl | null = null;

  showToast = false;
  cartCount = this.cartService.count;
  showCartModal = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    // 1. Buscamos primero en tu archivo local (GAMES)
    const localGame = GAMES.find(g => g.id == Number(id));

    if (localGame) {
      // --- TU LÓGICA ORIGINAL ---
      this.game = { ...localGame };
      const slugParaBusqueda = localGame.slug || localGame.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

      this.consumirApi(slugParaBusqueda);

      if (this.game.video) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.game.video);
      }
    } else {
      // --- LO QUE AÑADIMOS PARA LOS JUEGOS DE LA API ---
      // Si no está en GAMES.ts, usamos el ID directamente para pedirlo a RAWG
      this.consumirApi(id);
    }
  }

  // Creamos esta función interna para no repetir el .subscribe dos veces
  private consumirApi(identificador: string) {
    this.gameService.getGameDetails(identificador).subscribe({
      next: (apiData) => {
        // Si el juego NO es local, creamos el objeto base con datos de la API
        if (!this.game) {
          this.game = {
            id: apiData.id,
            title: apiData.name,
            img: apiData.background_image, // CLAVE: Usamos background_image de la API
            description: apiData.description_raw || 'Sin descripción disponible.',
            genre: apiData.genres?.[0]?.name || 'Videojuego',
            price: 59.99
          };
        }

        // Si el juego SÍ es local pero quieres usar la imagen de alta calidad de la API:
        if (apiData.background_image && !this.game.img) {
          this.game.img = apiData.background_image;
        }

        // Dentro de consumirApi -> subscribe -> next:
        if (apiData.clip?.clip) {
          this.game.video = apiData.clip.clip;
        } else if (apiData.movies?.results?.length > 0) {
          this.game.video = apiData.movies.results[0].data.max;
        }

        // Si encontramos URL, la sanitizamos para el reproductor
        if (this.game.video) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.game.video);
        }

        // Resto de tu lógica (plataformas, requisitos...)
        if (apiData.all_platforms) this.game.platform = apiData.all_platforms;
        if (apiData.requirements) this.game.requirements = apiData.requirements;
      }
    });
  }

  // Función para añadir/quitar de favoritos
  toggleFavorite() {
    if (this.game) {
      this.favService.toggleFavorite({
        id: this.game.id,
        title: this.game.title,
        platform: this.game.platform,
        img: this.game.img
      });
    }
  }

  // Getter para saber si es favorito actualmente
  get isFavorite(): boolean {
    return this.game ? this.favService.isFavorite(this.game.id) : false;
  }

  addToCart() {
    if (this.game) {
      this.cartService.addToCart(this.game);
      
      // Mostramos el mini modal estilo Steam
      this.showCartModal = true;

      // Opcional: Que se cierre solo después de 8 segundos si no hace nada
      // setTimeout(() => {
      //   this.showCartModal = false;
      // }, 8000);
    }
  }

  closeModal() {
    this.showCartModal = false;
  }

}