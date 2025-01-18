import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../config/environment';
import { Usuario } from '../../interfaces/usuario';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private apiUrl = API_ENDPOINTS.USUARIOS;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map((usuarios: Usuario[]) =>
        usuarios.filter(usuario =>
          Object.values(usuario).every(value => value !== null && value !== '' && value !== undefined)
        )
      )
    );
  }
  agregarUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, user);
  }
}
