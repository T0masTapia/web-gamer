import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarLayoutComponent {
  isOpen = true;
  private cartService = inject(CartService); //  Inyecta el servicio
  cartCount = this.cartService.count; //  Trae el signal 'count'

  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.sidebarToggle.emit(this.isOpen);
  }
}
