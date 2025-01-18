import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../core/services/usuario.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit, OnChanges {
  @Input() usuario: Usuario | null = null;
  @Output() usuarioCreado = new EventEmitter<void>();

  nombre: string = '';
  paterno: string = '';
  materno: string = '';
  correo: string = '';
  fecharegistro: string = '';
  estatus: number | null = null;
  hoy: string = new Date().toISOString().split('T')[0];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && this.usuario) {
      this.nombre = this.usuario.nombre;
      this.paterno = this.usuario.paterno;
      this.materno = this.usuario.materno;
      this.correo = this.usuario.correo;
      this.estatus = this.usuario.estatus;
      this.fecharegistro = new Date(this.usuario.fecharegistro).toISOString().split('T')[0];
    }
  }

  guardarUsuario(form: NgForm): void {
    Object.keys(form.controls).forEach((controlName) => {
      form.controls[controlName].markAsTouched();
    });

    if (form.valid) {
      const usuarioActualizado: Usuario = {
        idusuario: this.usuario ? this.usuario.idusuario : 0,
        nombre: this.nombre,
        paterno: this.paterno,
        materno: this.materno,
        correo: this.correo,
        estatus: this.estatus ?? 1,
        fecharegistro: new Date(this.fecharegistro)
      };

      this.usuarioService.agregarUsuario(usuarioActualizado).subscribe(
        () => {
          this.mostrarAlertaExitosa();
          this.usuarioCreado.emit(); 
          form.resetForm();
        },
        (error) => {
          this.mostrarAlertaError();
          console.error('Error al guardar usuario:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Errores en el formulario',
        text: 'Por favor, revisa los campos e intenta nuevamente.',
        toast: true,
        position: 'top-end',
        timer: 3000
      });
    }
  }

   mostrarAlertaExitosa(): void{
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
        title: "Usuario editado / agregado correctamente!"
      });
    }
  
    mostrarAlertaError(): void{
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
        title: "Ha ocurrido un error al registrar / actualizar el usuario!"
      });
    }
}
