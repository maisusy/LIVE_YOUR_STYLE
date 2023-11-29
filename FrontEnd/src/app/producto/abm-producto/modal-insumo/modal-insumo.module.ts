import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StylesModule } from 'src/app/styles.module';
import { ToastModule } from 'primeng/toast';
import { ModalInsumoComponent } from './modal-insumo.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';




@NgModule({
  declarations: [
    ModalInsumoComponent
  ],
  exports : [
    ModalInsumoComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    StylesModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class ModalInsumoModule { }
