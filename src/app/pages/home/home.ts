import { Component } from '@angular/core';
import { GameListComponent } from "../../components/game-list/game-list";
import { SidebarLayoutComponent } from '../../layouts/sidebar/sidebar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GameListComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomePageComponent {

  sidebarOpen = true;
  searchQuery: string = ''; // Variable para guardar lo que el usuario escribe

  onSidebarToggle(isOpen: boolean) {
    this.sidebarOpen = isOpen;
  }

  // Añadimos la función que el HTML está pidiendo
  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery = filterValue;
    console.log('Buscando juego:', this.searchQuery);
    
    // Aquí es donde conectarás con el catálogo para filtrar
  }
}