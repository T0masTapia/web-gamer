import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarLayoutComponent } from "./layouts/sidebar/sidebar";

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que sea standalone
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web-gamer');

  /**
   * Este es el estado global del Sidebar. 
   * true = abierto / false = cerrado.
   */
  sidebarOpen = signal(true);

  /**
   * Esta función se activa cuando el componente Sidebar 
   * emite el evento 'sidebarToggle'.
   */
  onSidebarToggle(opened: boolean) {
    this.sidebarOpen.set(opened);
  }
}