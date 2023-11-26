import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  
  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  /** PROVEEDOR */
  ObtenerProveedor(){
    return this.http.get(`${this.URL}/proveedor/api/`)
  }

  AgregarProveedor(datos : any){
    return this.http.post(`${this.URL}/proveedor/api/`,datos)
  }
  
  BorrarProveedor(id : number){
    return this.http.delete(`${this.URL}/proveedor/api/${id}/`)
  }

  ModificarProveedor(id : number,datos : any){
    return this.http.put(`${this.URL}/proveedor/api/${id}/`,datos)
  }

}
