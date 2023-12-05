import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment as env} from '../../environments/environments';
import { Router } from '@angular/router';
import { InterceptorService } from '../interceptors/interceptor.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { RouterTestingHarness } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    MessageService
  ]
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

  constructor(
    private Router : Router,
    private LoginService : LoginService,
    public messageService : MessageService,
  ){}

  Registrar(){
    this.Router.navigate(['abm-usuario'])
  }

  Ingresar() {
    if (this.formsLogin.valid) {
        this.LoginService.Login(this.formsLogin.value)
        .subscribe(
          (res : any) => {
          localStorage.setItem('token', res)
          localStorage.setItem('username',  this.formsLogin.value.username || '')
          this.Router.navigate(['inicio']);
          },
          (error) => {
            this.messageService.add({key: 'error', severity:'error', summary: `ERROR` , detail: error.error.error});

          }
        )

    } else {
      this.invalid = 'ng-dirty';
    }
  }

}
