import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuditoriaService } from '../../services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css',
})
export class AuditoriaComponent {
  auditorias: any[] = [];
  tituloActual: string = '';
  constructor(private auditoriaService: AuditoriaService) {}

  ngOnInit(): void {
    this.getAuditorias();
  }

  getAuditorias() {
    this.tituloActual = 'Todas las auditorías';
    this.auditoriaService.getAuditorias().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaFactura() {
    this.tituloActual = 'Auditoría Factura';
    this.auditoriaService.getAuditoriaFactura().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaProducto() {
    this.tituloActual = 'Auditoría Producto';
    this.auditoriaService.getAuditoriaProducto().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaVendedor() {
    this.tituloActual = 'Auditoría Vendedor';
    this.auditoriaService.getAuditoriaVendedor().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaCliente() {
    this.tituloActual = 'Auditoría Cliente';
    this.auditoriaService.getAuditoriaCliente().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaDetalleFactura() {
    this.tituloActual = 'Auditoría Detalle Factura';
    this.auditoriaService
      .getAuditoriaDetalleFactura()
      .subscribe((data: any) => {
        this.auditorias = data;
      });
  }

  getAuditoriaDistrito() {
    this.tituloActual = 'Auditoría Distrito';
    this.auditoriaService.getAuditoriaDistrito().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaProveedor() {
    this.tituloActual = 'Auditoría Proveedor';
    this.auditoriaService.getAuditoriaProveedor().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaOrdenCompra() {
    this.tituloActual = 'Auditoría Orden Compra';
    this.auditoriaService.getAuditoriaOrdenCompra().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaDetalleCompra() {
    this.tituloActual = 'Auditoría Detalle Compra';
    this.auditoriaService.getAuditoriaDetalleCompra().subscribe((data: any) => {
      this.auditorias = data;
    });
  }

  getAuditoriaAbastecimiento() {
    this.tituloActual = 'Auditoría Abastecimiento';
    this.auditoriaService
      .getAuditoriaAbastecimiento()
      .subscribe((data: any) => {
        this.auditorias = data;
      });
  }
}
