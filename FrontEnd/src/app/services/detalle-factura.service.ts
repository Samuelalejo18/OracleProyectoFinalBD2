import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../app/environments/environments';
@Injectable({
  providedIn: 'root',
})
export class DetalleFacturaService {
  apiUri = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllDetalles(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiUri + 'getDetallesFactura');
  }

  getDetalle(numFac: string, codPro: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}${this.apiUri}getDetalle/${numFac}/${codPro}`
    );
  }

  createDetalle(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'createDetalle',
      data,
      { headers: this.httpOptions }
    );
  }

  updateDetalle(numFac: string, data: any): Observable<any> {
    return this.http.put<any>(
      environment.apiUrl + this.apiUri + 'updateDetalle/' + numFac,
      data,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }

  deleteDetalle(numFac: string, codPro: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}${this.apiUri}deleteDetalle/${numFac}/${codPro}`,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }
}
