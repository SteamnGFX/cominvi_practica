import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../../interfaces/usuario';
import { Producto } from '../../../interfaces/producto';
import { Orden } from '../../../interfaces/Orden';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ProductoService } from '../../../core/services/producto.service';
import { OrdenService } from '../../../core/services/orden.service';

@Component({
  selector: 'app-formulario-orden',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-orden.component.html',
  styleUrls: ['./formulario-orden.component.css'],
})

export class FormularioOrdenComponent implements OnInit {
  usuarios: Usuario[] = [];
  productos: Producto[] = [];
  selectedUsuario: string = '';
  selectedProducto: string = '';
  cantidad: number = 1;
  preciounitario: number = 0;
  nuevaOrden!: Orden;
  @Output() ordenCreada = new EventEmitter<any>();

  constructor(
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private ordenService: OrdenService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarProductos();
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

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  crearOrden(form: any): void {
    if (form.valid) {
      const usuario = this.usuarios.find(u => u.idusuario === +this.selectedUsuario);
      const producto = this.productos.find(p => p.idproducto === +this.selectedProducto);

      if (usuario && producto) {
        const nuevaOrden: Orden = {
          idorden: Date.now(),
          usuario,
          producto,
          cantidad: this.cantidad,
          preciounitario: this.preciounitario,
          fecha: new Date(),
        };

        this.ordenService.agregarOrden(nuevaOrden).subscribe(
          () => {
            this.mostrarAlertaExitosa();
            this.ordenCreada.emit();
            form.resetForm();
          },
          (error) => {
            this.mostrarAlertaError();
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Incompleto',
        text: 'Por favor, completa todos los campos antes de enviar.',
      });
    }
  }


  mostrarAlertaExitosa(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Orden creada correctamente!"
    });
  }

  mostrarAlertaError(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Ha ocurrido un error al registrar la orden!"
    });
  }
}
