import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FacturaService } from '../../services/factura.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-factura',
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css',
})
export class FacturaComponent implements OnInit {
  facturas: any[] = [];
  facturaForm: FormGroup | any;
  idFactura: string = '';
  editableFactura: boolean = false;
  searchId: string = '';

  constructor(
    private facturaService: FacturaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFacturaForm();
    this.getFacturas();
  }

  getFacturas() {
    this.facturaService.getAllFacturas().subscribe((data: any) => {
      console.log(data);
      this.facturas = data;
    });
  }

  crearFacturaForm() {
    this.facturaForm = this.formBuilder.group({
      NUM_FAC: ['', [Validators.required]],
      FEC_FAC: ['', Validators.required],
      COD_CLI: ['', [Validators.required]],
      FEC_CAN: ['', [Validators.required]],
      EST_FAC: ['', [Validators.required]],
      POR_IGV: ['', [Validators.required]],
      COD_VEN: ['', [Validators.required]], // Relación con cliente
    });
  }

  crearFactura() {
    this.facturaService.createFactura(this.facturaForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Factura creada correctamente',
          text: response.message,
          confirmButtonText: 'OK',
          width: 400,
        });
        this.getFacturas();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la factura',
          text: err.error?.message || 'Error inesperado',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }

  updateFacturaEntry() {
    for (let key in this.facturaForm.value) {
      if (this.facturaForm.value[key] === '') {
        this.facturaForm.removeControl(key);
      }
    }
    this.facturaService
      .updateFactura(this.idFactura, this.facturaForm.value)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Factura actualizada correctamente',
            text: response.message,
            confirmButtonText: 'OK',
            width: 400,
          });
          this.getFacturas();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar la factura',
            text: err.error?.message || 'Error inesperado',
            confirmButtonText: 'OK',
            width: 400,
          });
        },
      });
  }

  toggleEditFactura(id: any) {
    this.idFactura = id + '';
    this.facturaService.getFactura(this.idFactura).subscribe((data) => {
      this.facturaForm.setValue({
        NUM_FAC: data.NUM_FAC,
        FEC_FAC: data.FEC_FAC,
        COD_CLI: data.COD_CLI,
        FEC_CAN: data.FEC_CAN,
        EST_FAC: data.EST_FAC,
        POR_IGV: data.POR_IGV,
        COD_VEN: data.COD_VEN,
      });
      this.editableFactura = !this.editableFactura;
    });
  }

  deleteFacturaEntry(id: any) {
    this.facturaService.deleteFactura(id).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Factura eliminada correctamente',
          text: response.message,
          confirmButtonText: 'OK',
          width: 400,
        });
        this.getFacturas();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar la factura',
          text: err.error?.message || 'Error inesperado',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }

  buscarPorId() {
    const id = this.searchId.trim();
    if (!id) {
      Swal.fire('Error', 'Ingrese un ID para buscar.', 'warning');
      return;
    }

    this.facturaService.getFactura(id).subscribe({
      next: (factura) => {
        this.facturas = [factura];
      },
      error: (err) => {
        this.getFacturas();
        Swal.fire({
          icon: 'error',
          title: 'Factura no encontrada',
          text: err.error?.message || 'No se encontró una factura con ese ID',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }
}
