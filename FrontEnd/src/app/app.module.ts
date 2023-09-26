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

@NgModule({
  declarations: [								
    AppComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StylesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MarcaModule,
    ColorModule,
    UnidadMedidaModule,
    LoginModule,
    MenuModule,
    InicioModule,
    ProductoModule,
    CategoriaModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
