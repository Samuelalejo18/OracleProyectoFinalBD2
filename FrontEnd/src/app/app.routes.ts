import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { DetalleFacturaComponent } from './pages/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'detalleFactura', component: DetalleFacturaComponent },
  { path: 'factura', component: FacturaComponent },
  { path: 'auditoria', component: AuditoriaComponent },
];
