import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  trmHoy(): Observable<any> {
    return this.http
    .get(`https://openexchangerates.org/api/latest.json?app_id=e3b92f7452eb4e7faee3948660c7fc5b`)
      .pipe(map((response) => response as any));
  }
  
}
