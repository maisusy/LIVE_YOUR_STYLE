import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmProveedorComponent } from './abm-proveedor.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { StylesModule } from 'src/app/styles.module';
import { InputMaskModule } from 'primeng/inputmask';



@NgModule({
  declarations: [
    AbmProveedorComponent
  ],
  exports : [
    AbmProveedorComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    StylesModule,
    InputMaskModule
  ]
})
export class AbmProveedorModule { }
