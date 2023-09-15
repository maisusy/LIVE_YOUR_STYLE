import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadMedidaComponent } from './unidad-medida.component';
import { AbmUnidadMedidaModule } from './abm-unidad-medida/abm-unidad-medida.module';
import { UnidadMedidaRoutingModule } from './unidad-medida-routing.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    UnidadMedidaComponent
  ],
  imports: [
    CommonModule,
    UnidadMedidaRoutingModule,
    AbmUnidadMedidaModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule
  ]
})
export class UnidadMedidaModule { }
