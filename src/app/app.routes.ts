import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home';
import { GameDetailPageComponent } from './pages/game-detail/game-detail';
import { FavoritesPageComponent } from './pages/Favorites/favorites';
import { CartPageComponent } from './pages/Cart/cart';
import { LoginPageComponent } from './pages/login/login';
import { ProfilePageComponent } from './pages/Profile/profile';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'game/:id',
        component: GameDetailPageComponent
    },
    {
        path: 'favorites',
        component: FavoritesPageComponent
    },
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    }
];
