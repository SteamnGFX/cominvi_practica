import { Routes } from '@angular/router';
import { OrdenComponent } from './components/ordenes/orden/orden.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';

export const routes: Routes = [
    { path: 'ordenes', component: OrdenComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: '', redirectTo: 'ordenes', pathMatch: 'full' }, 
  ];
