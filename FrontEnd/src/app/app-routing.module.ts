import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SesionExpComponent } from './login/sesion-exp/sesion-exp.component';

const routes: Routes = [
  { path: 'unidad_medida', loadChildren: () => import('./predefinidos/unidad-medida/unidad-medida.module').then(m => m.UnidadMedidaModule) },
  { path: 'color', loadChildren: () => import('./predefinidos/color/color.module').then(m => m.ColorModule) },
  { path: 'marca', loadChildren: () => import('./predefinidos/marca/marca.module').then(m => m.MarcaModule) },
  { path: 'categoria', loadChildren: () => import('./predefinidos/categoria/categoria.module').then(m => m.CategoriaModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'producto', loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule) },
  { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor.module').then(m => m.ProveedorModule) },
  { path: 'insumo', loadChildren: () => import('./insumo/insumo.module').then(m => m.InsumoModule) },
  { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'login', component: LoginComponent},
  { path: 'sesionexp', component: SesionExpComponent},
  { path:'',redirectTo:'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
