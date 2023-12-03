import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable, Subject } from 'rxjs';
import { Predefinidos } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private URL: string = "";
  private productosUpdated = new Subject<void>();
  productos : any = [];


  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  NotificarMenu() {
    console.log('Notificando que los productos se han actualizado');
    // Notificar que los productos se han actualizado
    this.productosUpdated.next();
  }

  ObtenerProductoActualizado() {

    console.log('actualizado objeto productos')
    return this.productosUpdated.asObservable();
  }

  /** Predefinidos */
  ObtenerPredefinidos(): Observable<Predefinidos> {
    return this.http.get<Predefinidos>(`${this.URL}/predefinidos/api/`)
  }
}
