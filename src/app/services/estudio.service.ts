import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudio } from '../models/estudio';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  private urlEndPoint: string = 'http://localhost:8090/api/estudios'

  constructor(private http: HttpClient) { }

  update(estudio: Estudio): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ estudio.id }`, estudio )
  };

  findEstudio(id: number): Observable<Estudio> {
    return this.http.get<Estudio>(`${ this.urlEndPoint }/${ id }` );
  }

  create(estudio: Estudio): Observable<Estudio>{
    return this.http.post<Estudio>(`${ this.urlEndPoint}`, estudio);
  }

  delete(id: number): Observable<Estudio>{
    return this.http.delete<Estudio>( `${ this.urlEndPoint }/${ id }` );
  }

}
