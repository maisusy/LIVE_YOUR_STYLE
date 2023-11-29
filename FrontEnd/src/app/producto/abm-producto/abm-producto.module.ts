import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AbmProductoComponent } from './abm-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StylesModule } from 'src/app/styles.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect'
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ModalInsumoModule } from './modal-insumo/modal-insumo.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AbmProductoComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    StylesModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    SelectButtonModule,
    MultiSelectModule,
    FileUploadModule,
    InputTextareaModule,
    ModalInsumoModule,
    TableModule
  ]
})
export class AbmProductoModule { }
