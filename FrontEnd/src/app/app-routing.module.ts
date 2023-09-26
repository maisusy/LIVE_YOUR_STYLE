import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'unidad_medida', loadChildren: () => import('./predefinidos/unidad-medida/unidad-medida.module').then(m => m.UnidadMedidaModule) },
  { path: 'color', loadChildren: () => import('./predefinidos/color/color.module').then(m => m.ColorModule) },
  { path: 'marca', loadChildren: () => import('./predefinidos/marca/marca.module').then(m => m.MarcaModule) },
  { path: 'categoria', loadChildren: () => import('./predefinidos/categoria/categoria.module').then(m => m.CategoriaModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'producto', loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule) },
  { path: 'login', component: LoginComponent},
  { path:'',redirectTo:'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
