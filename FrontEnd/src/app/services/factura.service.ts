import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  apiUri = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllFacturas(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiUri + 'getFacturas');
  }

  getFactura(id: string): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'getFactura/' + id
    );
  }

  createFactura(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'createFactura',
      data,
      {
        headers: this.httpOptions,
      }
    );
  }

  updateFactura(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + this.apiUri + 'updateFactura/' + id,
      data,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }

  deleteFactura(id: string): Observable<any> {
    return this.http.delete<any>(
      environment.apiUrl + this.apiUri + 'deleteFactura/' + id,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }
}
