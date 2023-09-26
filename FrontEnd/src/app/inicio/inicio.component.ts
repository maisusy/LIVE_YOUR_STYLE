import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environments';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

    public env = env;

  constructor(
    public ROUTER : Router
  ){
  
  }


    Redirigir(){
      this.ROUTER.navigate(['producto'])
    }
}
