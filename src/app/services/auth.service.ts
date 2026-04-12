import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  
  // Signal para el estado del usuario
  private currentUser = signal<any>(this.getUserFromStorage());

  // Propiedades públicas
  user = this.currentUser.asReadonly();
  isLoggedIn = computed(() => !!this.currentUser());

  private getUserFromStorage() {
    const user = localStorage.getItem('user_session');
    return user ? JSON.parse(user) : null;
  }

  login(userData: any) {
    // Simulamos un guardado de sesión
    localStorage.setItem('user_session', JSON.stringify(userData));
    this.currentUser.set(userData);
    this.router.navigate(['/']); // Redirigir a la home
  }

  logout() {
    localStorage.removeItem('user_session');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}