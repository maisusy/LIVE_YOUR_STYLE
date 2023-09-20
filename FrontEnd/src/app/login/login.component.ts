import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment as env} from '../../environments/environments';
import { Router } from '@angular/router';
import { InterceptorService } from '../interceptors/interceptor.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formsLogin = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })
  

  public invalid: string = "";
  public username: any ;
  public password: any ;
  public env = env;
  public token :any;

  constructor(
    private Router : Router,
    private LoginService : LoginService
  ){}


  Ingresar() {
    if (this.formsLogin.valid) {
        console.log(this.formsLogin.value);
        this.LoginService.Login(this.formsLogin.value)
        .subscribe(
          (res) => {
          this.token = res;
          console.log(res)
          localStorage.setItem('token',  this.token.access)
          this.Router.navigate(['inicio']);
               })

    } else {
      this.invalid = 'ng-dirty';
    }
  }

}
