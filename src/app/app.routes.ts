import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Favs } from './favs/favs';
import { Detalles } from './detalles/detalles';
import { Buscador } from './buscador/buscador';

export const routes: Routes = [
    { path: '', component: Principal },
    { path: 'anime/:id', component: Detalles },
    { path: 'mi-lista', component: Favs },
    { path: 'buscador', component: Buscador },

];
