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
@Component({
  selector: 'app-factura',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css',
})
export class FacturaComponent implements OnInit {
  facturas: any = [];
  facturaForm: FormGroup | any;
  idFactura: string = '';
  editableFactura: boolean = false;

  constructor(
    private facturaService: FacturaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFacturaForm();
    this.getFacturas();
  }

  crearFacturaForm() {
    this.facturaForm = this.formBuilder.group({
      NUM_FAC: ['', [Validators.required, Validators.maxLength(5)]],
      FEC_FAC: ['', Validators.required], // input type="date"
      COD_CLI: ['', [Validators.required, Validators.maxLength(5)]],
      MON_FAC: ['', [Validators.required, Validators.min(0)]],
      EST_FAC: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  getFacturas() {
    this.facturaService.getAllFacturas().subscribe((data: any) => {
      this.facturas = data;
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
          text: err.error.message || 'Error inesperado',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }

  updateFacturaEntry() {
    const valoresActualizados: any = {};
    for (let key in this.facturaForm.value) {
      if (this.facturaForm.value[key] !== '') {
        valoresActualizados[key] = this.facturaForm.value[key];
      }
    }

    this.facturaService
      .updateFactura(this.idFactura, valoresActualizados)
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
            text: err.error.message || 'Error inesperado',
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
        MON_FAC: data.MON_FAC,
        EST_FAC: data.EST_FAC,
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
          text: err.error.message || 'Error inesperado',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }
}
