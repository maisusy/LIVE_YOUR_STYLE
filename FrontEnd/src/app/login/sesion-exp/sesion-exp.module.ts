import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionExpComponent } from './sesion-exp.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    SesionExpComponent
  ],
  exports:[
    SesionExpComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class SesionExpModule { }
