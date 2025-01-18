import { Routes } from '@angular/router';
import { OrdenComponent } from './components/ordenes/orden/orden.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { TablaOrdenComponent } from './components/ordenes/tabla-orden/tabla-orden.component';

export const routes: Routes = [
    { path: 'ordenes', component: TablaOrdenComponent },
    { path: 'usuarios', component: UsuarioComponent },
    { path: '', redirectTo: 'ordenes', pathMatch: 'full' }, 
  ];
