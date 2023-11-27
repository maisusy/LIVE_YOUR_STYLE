import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumoComponent } from './insumo.component';
import { AbmInsumoModule } from './abm-insumo/abm-insumo.module';
import { InsumoRoutingModule } from './insumo-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InsumoComponent
  ],
  imports: [
    CommonModule,
    AbmInsumoModule,
    InsumoRoutingModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule,
    FormsModule
  ]
})
export class InsumoModule { }
