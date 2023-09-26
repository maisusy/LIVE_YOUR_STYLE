import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PredefinidosService {

  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  /** COLOR */
  ObtenerColor(){
    return this.http.get(`${this.URL}/color/api/`)
  }

  AgregarColor(datos : any){
    return this.http.post(`${this.URL}/color/api/`,datos)
  }
  
  BorrarColor(id : number){
    return this.http.delete(`${this.URL}/color/api/${id}/`)
  }

  ModificarColor(id : number,datos : any){
    return this.http.put(`${this.URL}/color/api/${id}/`,datos)
  }

  /** MARCA */
  ObtenerMarca(){
    return this.http.get(`${this.URL}/marca/api/`)
  }

  AgregarMarca(datos : any){
    return this.http.post(`${this.URL}/marca/api/`,datos)
  }
  
  BorrarMarca(id : number){
    return this.http.delete(`${this.URL}/marca/api/${id}/`)
  }

  ModificarMarca(id : number,datos : any){
    return this.http.put(`${this.URL}/marca/api/${id}/`,datos)
  }


  /** UNIDAD MEDIDA */
  ObtenerUnidadMedida(){
    return this.http.get(`${this.URL}/unidad_medida/api/`)
  }

  AgregarUnidadMedida(datos : any){
    return this.http.post(`${this.URL}/unidad_medida/api/`,datos)
  }
  
  BorrarUnidadMedida(id : number){
    return this.http.delete(`${this.URL}/unidad_medida/api/${id}/`)
  }

  ModificarUnidadMedida(id : number,datos : any){
    return this.http.put(`${this.URL}/unidad_medida/api/${id}/`,datos)
  }


  /** CATEGORIA */
  ObtenerCategorias(){
    return this.http.get(`${this.URL}/cat_prod/api/`)
  }

  AgregarCategoria(datos : any){
    return this.http.post(`${this.URL}/cat_prod/api/`,datos)
  }
  
  BorrarCategoria(id : number){
    return this.http.delete(`${this.URL}/cat_prod/api/${id}/`)
  }

  ModificarCategoria(id : number,datos : any){
    return this.http.put(`${this.URL}/cat_prod/api/${id}/`,datos)
  }

}
