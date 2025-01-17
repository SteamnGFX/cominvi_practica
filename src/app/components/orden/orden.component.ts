import { Component } from '@angular/core';
import { FormularioOrdenComponent } from "../formulario-orden/formulario-orden.component";
import { TablaOrdenComponent } from "../tabla-orden/tabla-orden.component";

@Component({
  selector: 'app-orden',
  standalone: true,
  imports: [FormularioOrdenComponent, TablaOrdenComponent],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.css'
})
export class OrdenComponent {

}
