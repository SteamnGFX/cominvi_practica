import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../../services/orden.service';
import { Orden } from '../../interfaces/Orden';

@Component({
  selector: 'app-tabla-orden',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-orden.component.html',
  styleUrls: ['./tabla-orden.component.css'],
})
export class TablaOrdenComponent implements OnInit {
  ordenes: Orden[] = [];

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.ordenService.getOrdenes().subscribe(
      (data: Orden[]) => {
        this.ordenes = data;
      },
      (error) => {
        console.error('Error al cargar órdenes:', error);
      }
    );
  }

  actualizarTabla(): void {
    this.cargarOrdenes(); // Método para actualizar los datos manualmente
  }

  calcularGranTotal(): number {
    return this.ordenes.reduce(
      (total, orden) => total + orden.cantidad * orden.preciounitario,
      0
    );
  }

  calcularTotalSmartphones(): number {
    return this.ordenes
      .filter(
        (orden) =>
          orden.producto.categoria &&
          orden.producto.categoria.toLowerCase() === 'smartphone'
      )
      .reduce((total, orden) => total + orden.cantidad * orden.preciounitario, 0);
  }
}
