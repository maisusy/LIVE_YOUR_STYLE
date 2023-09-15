import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StylesModule } from './styles.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from './menu/menu.module';
import { MarcaModule } from './predefinidos/marca/marca.module';
import { ColorComponent } from './predefinidos/color/color.component';
import { AbmColorComponent } from './predefinidos/color/abm-color/abm-color.component';
import { ColorModule } from './predefinidos/color/color.module';
import { UnidadMedidaModule } from './predefinidos/unidad-medida/unidad-medida.module';
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
    MenuModule,
    MarcaModule,
    ColorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
