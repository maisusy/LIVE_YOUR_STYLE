import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }
  /** Productos */
  ObtenerUsuarios(){
    return this.http.get(`${this.URL}/datos_usuario/api/`)
  }

  AgregarUsuario(datos : any){
    return this.http.post(`${this.URL}/datos_usuario/api/crear/`,datos)
  }

  ModificarUsuario(id : number,datos:any){
    return this.http.put(`${this.URL}/datos_usuario/api/${id}/`,datos)
  }

  BorrarUsuario(id : number){
    return this.http.delete(`${this.URL}/datos_usuario/api/${id}/`)
  }

  CambiarContraseña(username : string,datos:any){
    return this.http.put(`${this.URL}/datos_usuario/cambiocontrasenia/${username}/`,datos)
  }


}
