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

@NgModule({
  declarations: [
    AbmProductoComponent
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
    MultiSelectModule
  ]
})
export class AbmProductoModule { }
