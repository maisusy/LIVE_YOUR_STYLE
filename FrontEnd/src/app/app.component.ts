import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LiveYourStyle';

  constructor(private primeConfig : PrimeNGConfig){}

  ngOnInit(){
    this.primeConfig.ripple = true;
    this.primeConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      //translations
  });
  }

}
