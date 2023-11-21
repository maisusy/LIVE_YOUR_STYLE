import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './listado.component';
import { ListadoRoutingModule } from './listado-routing.module';
import { AbmProductoModule } from '../abm-producto/abm-producto.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    ListadoComponent
  ],
  imports: [
    ListadoRoutingModule,
    CommonModule,
    AbmProductoModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule
  ]
})
export class ListadoModule { }
