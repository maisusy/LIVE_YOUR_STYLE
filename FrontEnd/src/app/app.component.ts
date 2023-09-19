import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LiveYourStyle';
  public  ruta : any ;
  constructor(
    private primeConfig : PrimeNGConfig,
    private Router : Router){}

  ngOnInit(){
    
    this.Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Capturar la ruta actual cuando se complete una navegación
        this.ruta = event.url;
        console.log('Ruta actual:', this.ruta);
      }
    });


    this.primeConfig.ripple = true;
    this.primeConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      //translations
  });
  }

}
