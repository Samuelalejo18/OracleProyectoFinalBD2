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
import { DetalleFacturaService } from '../../services/detalle-factura.service';

@Component({
  selector: 'app-detalle-factura',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './detalle-factura.component.html',
  styleUrl: './detalle-factura.component.css',
})
export class DetalleFacturaComponent implements OnInit {
  detalles: any[] = [];
  detalleForm: FormGroup | any;;
  numFac: string = '';
  editableDetalle: boolean = false;

  constructor(
    private detalleService: DetalleFacturaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearDetalleForm();
    this.getDetalles();
  }

  crearDetalleForm() {
    this.detalleForm = this.formBuilder.group({
      NUM_FAC: ['', [Validators.required]],
      COD_PRO: ['', [Validators.required]],
      CAN_VEN: ['', [Validators.required, Validators.min(1)]],
      PRE_VEN: ['', [Validators.required, Validators.min(0)]],
    });
  }

  getDetalles() {
    this.detalleService.getAllDetalles().subscribe((data: any) => {
      this.detalles = data;
    });
  }

  crearDetalle() {
    this.detalleService.createDetalle(this.detalleForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Detalle creado correctamente',
          text: response.message,
          confirmButtonText: 'OK',
          width: 400,
        });
        this.getDetalles();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el detalle',
          text: err.error.message || 'Error al crear el detalle',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }

  updateDetalleEntry() {
    for (let key in this.detalleForm.value) {
      if (this.detalleForm.value[key] === '') {
        this.detalleForm.removeControl(key);
      }
    }
    this.detalleService
      .updateDetalle(this.numFac, this.detalleForm.value)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Detalle actualizado correctamente',
            text: response.message,
            confirmButtonText: 'OK',
            width: 400,
          });
          this.getDetalles();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el detalle',
            text: err.error.message || 'Error al actualizar el detalle',
            confirmButtonText: 'OK',
            width: 400,
          });
        },
      });
  }

  toggleEditDetalle(numFac: any, codPro: any) {
    this.numFac = numFac;
    this.detalleService.getDetalle(numFac, codPro).subscribe((data) => {
      this.detalleForm.setValue({
        NUM_FAC: data.NUM_FAC,
        COD_PRO: data.COD_PRO,
        CAN_VEN: data.CAN_VEN,
        PRE_VEN: data.PRE_VEN,
      });
      this.editableDetalle = true;
    });
  }

  deleteDetalleEntry(numFac: any, codPro: any) {
    this.detalleService.deleteDetalle(numFac, codPro).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Detalle eliminado correctamente',
          text: response.message,
          confirmButtonText: 'OK',
          width: 400,
        });
        this.getDetalles();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el detalle',
          text: err.error.message || 'Error al eliminar el detalle',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }
}
