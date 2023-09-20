import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { AbmProductoComponent } from './abm-producto/abm-producto.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
  },
  {
    path: 'abm-producto',
    component : AbmProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
