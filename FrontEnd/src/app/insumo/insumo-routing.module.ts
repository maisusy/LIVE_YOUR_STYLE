import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmInsumoComponent } from './abm-insumo/abm-insumo.component';
import { InsumoComponent } from './insumo.component';

const routes: Routes = [
  {
    path: '',
    component: InsumoComponent,
  },
  {
    path: 'abm-insumo',
    component : AbmInsumoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumoRoutingModule { }
