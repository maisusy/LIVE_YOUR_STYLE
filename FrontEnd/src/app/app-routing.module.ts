import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'color', loadChildren: () => import('./predefinidos/color/color.module').then(m => m.ColorModule) },
  { path: 'marca', loadChildren: () => import('./predefinidos/marca/marca.module').then(m => m.MarcaModule) },
  { path:'',redirectTo:'inicio',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
