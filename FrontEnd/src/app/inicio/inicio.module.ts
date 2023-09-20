import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { StylesModule } from '../styles.module';
import { StyleClassModule } from 'primeng/styleclass';
import { InicioRoutingModule } from './inicio-routing.module';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    StyleClassModule,
    StylesModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
