import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { getSpanishPaginatorIntl } from '../../../custom-paginator-intl';

@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
})
export class TablaUsuarioComponent implements OnInit {
  displayedColumns: string[] = [
    'idusuario',
    'nombre',
    'paterno',
    'materno',
    'correo',
    'fecharegistro',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Usuario>([]); 
  @Output() usuarioSeleccionado = new EventEmitter<Usuario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  actualizarTabla(): void {
    this.cargarUsuarios(); 
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (data: Usuario[]) => {
        this.dataSource.data = data; 
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado.emit(usuario);
  }
}
