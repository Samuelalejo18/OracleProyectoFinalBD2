import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
apiUri = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllProductos(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiUri + 'getProductos');
  }

  getProducto(codigo: string): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'getProducto/' + codigo
    );
  }

  createProducto(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'createProducto',
      data,
      { headers: this.httpOptions }
    );
  }

  updateProducto(codigo: string, data: any): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + this.apiUri + 'updateProducto/' + codigo,
      data,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }

  deleteProducto(codigo: string): Observable<any> {
    return this.http.delete<any>(
      environment.apiUrl + this.apiUri + 'deleteProducto/' + codigo,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }
}