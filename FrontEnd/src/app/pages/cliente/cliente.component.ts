import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cliente',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent implements OnInit {
  clientes: any = [];
  clienteForm: FormGroup | any;
  idCliente: string = '';
  editableCliente: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearClienteForm();
    this.getClientes();
  }

  getClientes() {
    this.clienteService.getAllClientes().subscribe((data: any) => {
      this.clientes = data;
    });
  }

  crearClienteForm() {
    this.clienteForm = this.formBuilder.group({
      COD_CLI: ['', [Validators.required, Validators.maxLength(5)]],
      RSO_CLI: ['', [Validators.required, Validators.maxLength(30)]],
      DIR_CLI: ['', [Validators.required, Validators.maxLength(100)]],
      TLF_CLI: ['', [Validators.required, Validators.maxLength(9)]],
      RUC_CLI: ['', [Validators.required, Validators.maxLength(11)]],
      COD_DIS: ['', [Validators.required, Validators.maxLength(5)]],
      FEC_REG: ['', Validators.required], // tipo DATE
      TIP_CLI: ['', [Validators.required, Validators.maxLength(10)]],
      CON_CLI: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  crearCliente() {
    this.clienteService.createCliente(this.clienteForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente creado correctamente',
          confirmButtonText: 'OK',
          width: 400,
          text: response.message,
        });
        this.getClientes(); // Actualiza la lista de clientes
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el cliente',
          // si usas `html`, SweetAlert no mostrará `text`
          text: err.error.message || 'Error al crear el cliente',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }

  updateClienteEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.clienteForm.value) {
      if (this.clienteForm.value[key] === '') {
        this.clienteForm.removeControl(key);
      }
    }
    this.clienteService
      .updateCliente(this.idCliente, this.clienteForm.value)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado correctamente',
            confirmButtonText: 'OK',
            width: 400,
            text: response.message,
          });
          this.getClientes(); // Actualiza la lista de clientes
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el cliente',
            // si usas `html`, SweetAlert no mostrará `text`
            text: err.error.message || 'Error al crear el cliente',
            confirmButtonText: 'OK',
            width: 400,
          });
        },
      });
  }

  toggleEditCliente(id: any) {
    this.idCliente = id + '';
    console.log(this.idCliente);
    this.clienteService.getCliente(this.idCliente).subscribe((data) => {
      this.clienteForm.setValue({
        COD_CLI: data.COD_CLI,
        RSO_CLI: data.RSO_CLI,
        DIR_CLI: data.DIR_CLI,
        TLF_CLI: data.TLF_CLI,
        RUC_CLI: data.RUC_CLI,
        COD_DIS: data.COD_DIS,
        FEC_REG: data.FEC_REG, // Asegúrate que el formato sea compatible con tipo input="date"
        TIP_CLI: data.TIP_CLI,
        CON_CLI: data.CON_CLI,
      });
      this.editableCliente = !this.editableCliente;
    });
  }

  deleteClienteEntry(id: any) {
    console.log(id);
    this.clienteService.deleteCliente(id).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado correctamente',
          confirmButtonText: 'OK',
          width: 400,
          text: response.message,
        });
        this.getClientes(); // Actualiza la lista de clientes
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al aliminar el cliente',
          // si usas `html`, SweetAlert no mostrará `text`
          text: err.error.message || 'Error al crear el cliente',
          confirmButtonText: 'OK',
          width: 400,
        });
      },
    });
  }
}
