import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../config/environment';
import { Observable } from 'rxjs';
import { Orden } from '../../interfaces/Orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient) { }

    private apiUrl = API_ENDPOINTS.ORDENES
  

  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrl);
  }

  agregarOrden(order: Orden): Observable<Orden> {
    return this.http.post<Orden>(this.apiUrl, order);
  }
}
