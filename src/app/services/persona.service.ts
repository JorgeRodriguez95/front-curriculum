import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private baseEndpoint = "asdad"; 

  constructor(private http: HttpClient) { }
}
