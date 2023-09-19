import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  /** LOGIN */
  Login(datos : any ){
    return this.http.post(`${this.URL}/api/token/`,datos)
  }
}
