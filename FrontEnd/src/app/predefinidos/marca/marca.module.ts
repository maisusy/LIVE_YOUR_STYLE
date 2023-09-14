import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MarcaComponent } from './marca.component';
import { AbmMarcaModule } from './abm-marca/abm-marca.module';
import { ButtonModule } from 'primeng/button';
import { MarcaRoutingModule } from './marca-routing.module';



@NgModule({
  declarations: [
    MarcaComponent
  ],
  imports: [
    MarcaRoutingModule,
    CommonModule,
    AbmMarcaModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule
  ],
  
})
export class MarcaModule { }
