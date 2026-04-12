import { Component, inject, input, effect } from '@angular/core'; // Añadimos 'effect'
import { GameCardComponent } from "../game-card/game-card";
import { GameService } from '../../services/game';

@Component({
  selector: 'app-game-list',
  standalone: true, // Asegúrate de tener esto
  imports: [GameCardComponent],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameListComponent {
  private gameService = inject(GameService);

  // Recibimos el texto de la Home
  searchTerm = input<string>(''); 
  
  gamesList: any[] = [];

  constructor() {
    // ESTO ES LO QUE CAMBIÉ:
    // El 'effect' vigila el searchTerm. Si escribes en la Home, 
    // esto se ejecuta automáticamente sin necesidad de ngOnInit.
    effect(() => {
      const valorABuscar = this.searchTerm();
      this.cargarJuegos(valorABuscar);
    });
  }

  cargarJuegos(texto: string) {
    this.gameService.getGamesList(texto).subscribe({
      next: (data) => {
        this.gamesList = data;
      },
      error: (err) => console.error('Error al buscar:', err)
    });
  }
}