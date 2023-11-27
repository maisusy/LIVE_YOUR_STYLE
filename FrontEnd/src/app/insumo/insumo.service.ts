import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
 
  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  /** INSUMO */
  ObtenerInsumo(){
    return this.http.get(`${this.URL}/insumo/api/`)
  }

  AgregarInsumo(datos : any){
    return this.http.post(`${this.URL}/insumo/api/`,datos)
  }
  
  BorrarInsumo(id : number){
    return this.http.delete(`${this.URL}/insumo/api/${id}/`)
  }

  ModificarInsumo(id : number,datos : any){
    return this.http.put(`${this.URL}/insumo/api/${id}/`,datos)
  }

}
