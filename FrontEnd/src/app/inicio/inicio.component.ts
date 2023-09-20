import { Component } from '@angular/core';
import { environment as env } from 'src/environments/environments';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

    public env = env;

}
