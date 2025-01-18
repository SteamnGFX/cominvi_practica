import { Component, OnInit, ViewChild } from '@angular/core';
import { Orden } from '../../../interfaces/Orden';
import { OrdenService } from '../../../core/services/orden.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../custom-paginator-intl';

@Component({
  selector: 'app-tabla-orden',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './tabla-orden.component.html',
  styleUrls: ['./tabla-orden.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
  ],
})
export class TablaOrdenComponent implements OnInit {
  displayedColumns: string[] = [
    'idorden',
    'nombreUsuario',
    'nombreProducto',
    'categoria',
    'cantidad',
    'preciounitario',
    'importeTotal',
    'fecha',
  ];
  dataSource = new MatTableDataSource<Orden>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ordenService: OrdenService) {
    this.dataSource.filterPredicate = (data: Orden, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
      return (
        data.idorden.toString().includes(normalizedFilter) ||
        data.usuario.nombre.toLowerCase().includes(normalizedFilter) || 
        data.producto.nombre.toLowerCase().includes(normalizedFilter) || 
        data.producto.categoria.toLowerCase().includes(normalizedFilter) || 
        data.cantidad.toString().includes(normalizedFilter) ||
        data.preciounitario.toString().includes(normalizedFilter) 
      );
    };
  }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  actualizarTabla(): void {
    this.cargarOrdenes();
    this.calcularGranTotal();
    this.calcularTotalSmartphones();
  }

  cargarOrdenes(): void {
    this.ordenService.getOrdenes().subscribe(
      (data: Orden[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar órdenes:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  calcularGranTotal(): number {
    return this.dataSource.data.reduce(
      (total, orden) => total + orden.cantidad * orden.preciounitario,
      0
    );
  }

  calcularTotalSmartphones(): number {
    return this.dataSource.data
      .filter(
        (orden) =>
          orden.producto.categoria &&
          orden.producto.categoria.toLowerCase() === 'smartphone'
      )
      .reduce((total, orden) => total + orden.cantidad * orden.preciounitario, 0);
  }
}
