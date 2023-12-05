import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { StylesModule } from '../styles.module';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ModalVentasModule } from '../producto/modal-ventas/modal_ventas.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


@NgModule({
  declarations: [
    MenuComponent
  ],
  exports:[
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    TabMenuModule,
    StylesModule,
    DialogModule,
    TableModule,
    ModalVentasModule,
    ToastModule,
    ConfirmPopupModule
  ]
})
export class MenuModule { }
