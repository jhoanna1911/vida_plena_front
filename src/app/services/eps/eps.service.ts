import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpsService {

  constructor(private http: HttpClient) { }

  consularInfoEps(idEps: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get(`${environment.apiUrl}/api/eps/consultar?idEps=${idEps}`, { headers });
  }

}
