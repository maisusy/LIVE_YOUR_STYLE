import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment as env} from '../../environments/environments';

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


  Ingresar(){
    if (this.formsLogin.valid) {
      console.log(this.formsLogin.value)
    }else{
      this.invalid = "ng-dirty"
    }

  }

}
