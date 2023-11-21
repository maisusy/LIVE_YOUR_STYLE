import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { AbmProductoComponent } from './abm-producto/abm-producto.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
  },
  {
    path: 'abm-producto',
    component : AbmProductoComponent
  },
  {
    path: 'listado',
    component : ListadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
