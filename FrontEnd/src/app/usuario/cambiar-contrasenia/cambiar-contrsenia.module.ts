import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StylesModule } from 'src/app/styles.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect'
import { PasswordModule } from 'primeng/password';
import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';

@NgModule({
  declarations: [
    CambiarContraseniaComponent
  ],
  exports:[
    CambiarContraseniaComponent
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
    PasswordModule
  ]
})
export class CambiarContraseniaModule { }
