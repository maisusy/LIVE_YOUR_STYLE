import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylesModule } from '../styles.module';
import { CarouselModule } from 'primeng/carousel';
import { ProductoComponent } from './producto.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

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
    TagModule
  ]
})
export class ProductoModule { }
