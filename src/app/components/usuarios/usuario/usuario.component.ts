import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { TablaUsuarioComponent } from '../tabla-usuario/tabla-usuario.component';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormularioUsuarioComponent, TablaUsuarioComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})

export class UsuarioComponent {
  usuarioSeleccionado: Usuario | null = null; 
}

