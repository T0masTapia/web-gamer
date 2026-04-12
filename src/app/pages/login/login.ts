import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginPageComponent {
    private authService = inject(AuthService);

    onSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        // DATOS FIJOS PARA PRUEBAS
        const EMAIL_CORRECTO = 'admin@gmail.com';
        const PASS_CORRECTA = '1234';

        if (email === EMAIL_CORRECTO && password === PASS_CORRECTA) {
            this.authService.login({
                name: 'Tomás',
                email: email,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tomas'
            });
        } else {
            alert('Credenciales incorrectas. Prueba con admin@gmail.com / 1234');
        }
    }
}