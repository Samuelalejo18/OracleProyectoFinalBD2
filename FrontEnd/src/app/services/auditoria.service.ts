import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  apiUri = '/api/';

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAuditorias(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + this.apiUri + 'auditorias');
  }
  getAuditoriaFactura(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/factura'
    );
  }

  getAuditoriaProducto(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/producto'
    );
  }

  getAuditoriaVendedor(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/vendedor'
    );
  }

  getAuditoriaCliente(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/cliente'
    );
  }

  getAuditoriaDetalleFactura(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/detalle-factura'
    );
  }

  getAuditoriaDistrito(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/distrito'
    );
  }

  getAuditoriaProveedor(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/proveedor'
    );
  }

  getAuditoriaOrdenCompra(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/orden-compra'
    );
  }

  getAuditoriaDetalleCompra(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/detalle-compra'
    );
  }

  getAuditoriaAbastecimiento(): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + this.apiUri + 'auditoria/abastecimiento'
    );
  }
}
