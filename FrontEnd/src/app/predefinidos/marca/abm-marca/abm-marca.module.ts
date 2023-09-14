import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StylesModule } from 'src/app/styles.module';
import { ToastModule } from 'primeng/toast';
import { AbmMarcaComponent } from './abm-marca.component';


@NgModule({
  declarations: [
    AbmMarcaComponent
  ],
  exports : [
    AbmMarcaComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    StylesModule,
  ]
})
export class AbmMarcaModule { }
