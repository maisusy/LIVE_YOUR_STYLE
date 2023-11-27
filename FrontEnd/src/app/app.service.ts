import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Predefinidos } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private URL: string = "";

  constructor( private http: HttpClient) {
    this.URL = environment.apiURL
  }

  /** Predefinidos */
  ObtenerPredefinidos(): Observable<Predefinidos> {
    return this.http.get<Predefinidos>(`${this.URL}/predefinidos/api/`)
  }
}
