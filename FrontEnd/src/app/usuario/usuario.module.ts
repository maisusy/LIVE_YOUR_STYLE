import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { AbmUsuarioModule } from './abm-usuario/abm-usuario.module';



@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    AbmUsuarioModule
  ]
})
export class UsuarioModule { }
