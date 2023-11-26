import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './proveedor.component';
import { AbmProveedorComponent } from './abm-proveedor/abm-proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedorComponent,
  },
  {
    path: 'abm-proveedor',
    component : AbmProveedorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
