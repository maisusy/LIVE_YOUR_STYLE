import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ColorComponent } from './color.component';
import { AbmColorModule } from './abm-color/abm-color.module';
import { ButtonModule } from 'primeng/button';
import { ColorRoutingModule } from './color-routing.module';


@NgModule({
  declarations: [ColorComponent],
  imports: [
    ColorRoutingModule,
    CommonModule,
    AbmColorModule,
    ToastModule,
    TableModule,
    ConfirmPopupModule,
    ButtonModule
  ],
})
export class ColorModule { }
