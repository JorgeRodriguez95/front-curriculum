import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciasService {

  
  private urlEndPoint: string = 'http://localhost:8090/api/experiencias'

  constructor(private http: HttpClient) { }

  update(experiencia: Experiencia): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ experiencia.id }`, experiencia )
  };

  findExperiencia(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${ this.urlEndPoint }/${ id }` );
  }

  create(experiencia: Experiencia): Observable<Experiencia>{
    return this.http.post<Experiencia>(`${ this.urlEndPoint}`, experiencia);
  }

  delete(id: number): Observable<Experiencia>{
    return this.http.delete<Experiencia>( `${ this.urlEndPoint }/${ id }` );
  }
}
