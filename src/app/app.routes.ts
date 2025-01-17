import { Routes } from '@angular/router';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { OrdenComponent } from './components/orden/orden.component';

export const routes: Routes = [
    { path: 'ordenes', component: OrdenComponent },
    { path: 'usuarios', component: FormularioUsuarioComponent },
    { path: '', redirectTo: 'ordenes', pathMatch: 'full' }, 
  ];
