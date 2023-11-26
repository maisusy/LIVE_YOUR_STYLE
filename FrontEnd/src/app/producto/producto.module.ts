import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../styles.module';
import { CarouselModule } from 'primeng/carousel';
import { ProductoComponent } from './producto.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { InputTextModule } from 'primeng/inputtext';
import { AbmProductoModule } from './abm-producto/abm-producto.module';
import { ListadoModule } from './listado/listado.module';
import { ProductoService } from './producto.service';
@NgModule({
  declarations: [
    ProductoComponent
  ],
  imports: [
    CommonModule,
    StylesModule,
    CarouselModule,
    ProductoRoutingModule,
    ButtonModule,
    TagModule,
    AbmProductoModule,
    InputTextModule,
    ListadoModule
  ],
  providers: [ProductoService],
})
export class ProductoModule { }
