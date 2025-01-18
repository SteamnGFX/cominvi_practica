import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  @Output() usuarioSeleccionado = new EventEmitter<Usuario>();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  actualizarTabla(): void {
    this.cargarUsuarios(); 
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado.emit(usuario); 
  }
}