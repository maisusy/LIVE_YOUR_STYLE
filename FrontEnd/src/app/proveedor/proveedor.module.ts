import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './proveedor.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { AbmProveedorModule } from './abm-proveedor/abm-proveedor.module';
import { ProveedorRoutingModule } from './proveedor-routing.module';



@NgModule({
  declarations: [
    ProveedorComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule,
    AbmProveedorModule,
    ProveedorRoutingModule
  ]
})
export class ProveedorModule { }
