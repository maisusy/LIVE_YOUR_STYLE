import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { AbmCategoriaModule } from './abm-categoria/abm-categoria.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CategoriaRoutingModule,
    CommonModule,
    AbmCategoriaModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule
  ]
})
export class CategoriaModule { }
