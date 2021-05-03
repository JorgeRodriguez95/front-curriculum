import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conocimiento } from '../models/conocimiento';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  private urlEndPoint: string = 'http://localhost:8090/api/conocimientos'

  constructor(private http: HttpClient) { }

  update(conocimiento: Conocimiento): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ conocimiento.id }`, conocimiento )
  };

  findConocimiento(id: number): Observable<Conocimiento> {
    return this.http.get<Conocimiento>(`${ this.urlEndPoint }/${ id }` );
  }

  create(conocimiento: Conocimiento): Observable<Conocimiento>{
    return this.http.post<Conocimiento>(`${ this.urlEndPoint}`, conocimiento);
  }

  delete(id: number): Observable<Conocimiento>{
    return this.http.delete<Conocimiento>( `${ this.urlEndPoint }/${ id }` );
  }
}
