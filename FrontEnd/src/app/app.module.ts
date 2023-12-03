import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StylesModule } from './styles.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarcaModule } from './predefinidos/marca/marca.module';
import { ColorModule } from './predefinidos/color/color.module';
import { UnidadMedidaModule } from './predefinidos/unidad-medida/unidad-medida.module';
import { LoginModule } from './login/login.module';
import { InicioModule } from './inicio/inicio.module';
import { MenuModule } from './menu/menu.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './predefinidos/categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import localeEsAR from '@angular/common/locales/es-AR';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    VentasComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    StylesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarcaModule,
    ColorModule,
    UnidadMedidaModule,
    LoginModule,
    MenuModule,
    InicioModule,
    ProveedorModule,
    CategoriaModule,
    UsuarioModule,
    ProductoModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
