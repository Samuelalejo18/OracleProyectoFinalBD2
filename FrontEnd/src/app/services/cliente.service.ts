import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../app/environments/environments';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  apiUri = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllClientes(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiUri + 'getClientes');
  }
  getCliente(id: string): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'getCliente/' + id
    );
  }

  updateCliente(id: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put<any>(
      environment.apiUrl + this.apiUri + 'updateCliente/' + id,
      data,
      {
        headers: this.httpOptions,
        withCredentials: true,
      }
    );
  }

  deleteCliente(id: any) {
    return this.http.delete<any>(this.apiUri + 'deleteCliente/' + id, {
      headers: this.httpOptions,
      withCredentials: true,
    });
  }

  createCliente(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + this.apiUri + 'createCliente',
      data,
      { headers: this.httpOptions }

      // no pasamos headers: el browser pone multipart/form-data con el boundary
    );
  }
}
