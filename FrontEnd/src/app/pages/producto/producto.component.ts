import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  productos: any = [];
  productoForm: FormGroup | any;
  idProducto: string = '';
  editableProducto: boolean = false;
  searchId: string = '';

  constructor(
    private productoService: ProductoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearProductoForm();
    this.getProductos();
  }

  crearProductoForm() {
    this.productoForm = this.formBuilder.group({
      COD_PRO: ['', [Validators.required, Validators.maxLength(4)]],
      DES_PRO: ['', [Validators.required, Validators.maxLength(50)]],
      PRE_PRO: [0, [Validators.required]],
      SAC_PRO: [0, [Validators.required]],
      SME_PRO: [0, [Validators.required]],
      UNI_PRO: ['', [Validators.required, Validators.maxLength(30)]],
      LIN_PRO: ['', [Validators.required, Validators.maxLength(30)]],
      IMP_PRO: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  getProductos() {
    this.productoService.getAllProductos().subscribe((data: any) => {
      this.productos = data;
    });
  }

  crearProducto() {
    this.productoService.createProducto(this.productoForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto creado correctamente',
          text: response.message,
          confirmButtonText: 'OK',
          width: 400,
        });
        this.getProductos(); // Recargar la lista
        this.productoForm.reset();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el producto',
          text: err.error.message || 'Error desconocido',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }

  updateProductoEntry() {
    for (let key in this.productoForm.value) {
      if (this.productoForm.value[key] === '') {
        this.productoForm.removeControl(key);
      }
    }

    this.productoService
      .updateProducto(this.idProducto, this.productoForm.value)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
            text: response.message,
            confirmButtonText: 'OK',
            width: 400,
          });
          this.getProductos();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: err.error.message || 'Error desconocido',
            confirmButtonText: 'OK',
            width: 400,
          });
        },
      });
  }

  toggleEditProducto(codigo: string) {
    this.idProducto = codigo;
    this.productoService.getProducto(codigo).subscribe((data) => {
      this.productoForm.setValue({
        COD_PRO: data.COD_PRO,
        DES_PRO: data.DES_PRO,
        PRE_PRO: data.PRE_PRO,
        SAC_PRO: data.SAC_PRO,
        SME_PRO: data.SME_PRO,
        UNI_PRO: data.UNI_PRO,
        LIN_PRO: data.LIN_PRO,
        IMP_PRO: data.IMP_PRO,
      });
      this.editableProducto = true;
    });
  }

  deleteProductoEntry(codigo: string) {
    this.productoService.deleteProducto(codigo).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado',
          text: response.message,
          confirmButtonText: 'OK',
          width: 400,
        });
        this.getProductos();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: err.error.message || 'Error desconocido',
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

    this.productoService.getProducto(id).subscribe({
      next: (producto) => {
        this.productos = [producto]; 
         this.searchId = ''; // Muestra solo el cliente encontrado
      },
      error: (err) => {
        this.getProductos();
        Swal.fire({
          icon: 'error',
          title: 'Producto no encontrado',
          text: err.error?.message || 'No se encontró el producto con ese ID',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }
}
