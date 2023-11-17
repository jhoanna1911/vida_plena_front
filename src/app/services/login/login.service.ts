import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/model/usuario';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validarUsuario(usuario: Usuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(`${environment.apiUrl}/api/login/consultarUsuario`, usuario, { headers });
  }

  consularInfoUsuario(login: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get(`${environment.apiUrl}/api/login/informacionUsuario?login=${login}`, { headers });
  }

  recordarContrasena(correo: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(`${environment.apiUrl}/api/login/recordarContrasena`, correo, { headers });
  }

  guardarUsuario(usuario: Usuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(`${environment.apiUrl}/api/login/guardar`, usuario, { headers });
  }

  obtenerListaEps(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get(`${environment.apiUrl}/api/login/consultarEps`, { headers });
  }

  consularListaUsuario(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get(`${environment.apiUrl}/api/login/consultarLista`, { headers });
  }

}
