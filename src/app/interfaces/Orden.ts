import { Producto } from "./producto";
import { Usuario } from "./usuario";

export interface Orden {
  idorden: number;
  usuario: Usuario;
  producto: Producto;
  cantidad: number;
  preciounitario: number;
  fecha: Date;
}