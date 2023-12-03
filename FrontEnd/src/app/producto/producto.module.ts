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
import { ModalVentasModule } from './modal-ventas/modal_ventas.module';
import { ToastModule } from 'primeng/toast';

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
    ListadoModule,
    ModalVentasModule,
    ToastModule
  ],
  providers: [ProductoService],
})
export class ProductoModule { }
