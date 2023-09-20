import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  /** Productos */
  ObtenerProductos(){
    return this.http.get(`${this.URL}/producto/api/`)
  }


  AgregarProducto(datos : any){
    return this.http.post(`${this.URL}/producto/api/`,datos)
  }


  ModificarProducto(id : number,datos:any){
    return this.http.put(`${this.URL}/producto/api/${id}/`,datos)
  }


  BorrarProducto(id : number){
    return this.http.delete(`${this.URL}/producto/api/${id}/`)
  }



}
