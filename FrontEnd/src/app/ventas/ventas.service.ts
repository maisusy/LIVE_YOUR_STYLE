import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }
  /** Ventas */
  ObtenerVentas(){
    return this.http.get(`${this.URL}/venta/api/`)
  }

  AgregarVenta(datos : any){
    return this.http.post(`${this.URL}/venta/api/`,datos)
  }

  ModificarVenta(id : number,datos:any){
    return this.http.put(`${this.URL}/venta/api/${id}/`,datos)
  }

  BorrarVenta(id : number){
    return this.http.delete(`${this.URL}/venta/api/${id}/`)
  }

}
