import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmInsumoComponent } from './abm-insumo.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { StylesModule } from 'src/app/styles.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [
    AbmInsumoComponent
  ],
  exports : [
    AbmInsumoComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    StylesModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class AbmInsumoModule { }
