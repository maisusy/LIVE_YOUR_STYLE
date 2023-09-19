import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment as env} from '../../environments/environments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formsLogin = new FormGroup({
    'usuario': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })
  

  public invalid: string = "";
  public env = env;

  constructor(
    private Router : Router
  ){}


  Ingresar(){
    if (this.formsLogin.valid) {
      console.log(this.formsLogin.value)
      this.Router.navigate(['inicio'])
    }else{
      this.invalid = "ng-dirty"
    }

  }

}
