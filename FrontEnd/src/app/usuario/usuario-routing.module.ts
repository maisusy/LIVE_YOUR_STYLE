import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { AbmUsuarioComponent } from './abm-usuario/abm-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
  },
  {
    path: 'abm-usuario',
    component : AbmUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
