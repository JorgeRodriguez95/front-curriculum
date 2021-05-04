import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conocimiento } from '../models/conocimiento';
import { Estudio } from '../models/estudio';
import { Experiencia } from '../models/experiencia';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private urlEndPoint: string = 'http://localhost:8090/api/personas'

  constructor(private http: HttpClient) { }

  getPersonaByUsername(username: string): Observable<Persona> {
    return this.http.get<Persona>(`${ this.urlEndPoint }/buscar-username/${ username }` );
  }

  update(persona: Persona): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ persona.id }`, persona )
  };

  findPersona(nombres: string): Observable<any>{
    return this.http.get<Persona>(`${ this.urlEndPoint }/buscar-persona/${ nombres }` );
  }

  addExperiencia(personaId: number, experiencia : Experiencia): Observable<Persona>{
    return this.http.put<Persona>(`${ this.urlEndPoint }/${ personaId }/agregar-experiencia`, experiencia);
  }

  addEstudio(personaId: number, estudio : Estudio): Observable<Persona>{
    return this.http.put<Persona>(`${ this.urlEndPoint }/${ personaId }/agregar-estudio`, estudio);
  }

  addConocimiento(personaId: number, conocimiento : Conocimiento): Observable<Persona>{
    return this.http.put<Persona>(`${ this.urlEndPoint }/${ personaId }/agregar-conocimiento`, conocimiento);
  }

  quitarExperiencia(personaId: number, experiencia : Experiencia): Observable<Persona>{
    return this.http.put<Persona>(`${ this.urlEndPoint }/${ personaId }/eliminar-experiencia`, experiencia);
  }

  quitarEstudio(personaId: number, estudio : Estudio): Observable<Persona>{
    return this.http.put<Persona>(`${ this.urlEndPoint }/${ personaId }/eliminar-estudio`, estudio);
  }

  quitarConocimiento(personaId: number, conocimiento : Conocimiento): Observable<Persona>{
    return this.http.put<Persona>(`${ this.urlEndPoint }/${ personaId }/eliminar-conocimiento`, conocimiento);
  }

  addFoto(archivo: File, id: number, tipo: string){
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('tipo', tipo);
    return this.http.put<Persona>(`${ this.urlEndPoint }/upload/${ id }`, formData)
  }

}
