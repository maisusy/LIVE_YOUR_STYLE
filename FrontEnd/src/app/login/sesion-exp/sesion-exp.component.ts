import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sesion-exp',
  templateUrl: './sesion-exp.component.html',
  styleUrls: ['./sesion-exp.component.css']
})
export class SesionExpComponent {

  constructor(
    private router : Router
  ){}

  Cerrar() {
      this.router.navigate(['login'])
  }

}
