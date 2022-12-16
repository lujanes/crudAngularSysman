import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Persona } from './persona';
import { GlobalConstants } from '../utilidades/global-constans';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class PersonaService {

  constructor(private http: HttpClient,
    private router: Router) { }

    getPersonas(): Observable<Persona[]> {
      return this.http.get<Persona[]>(GlobalConstants.apiURL + "personas");
    }

    getPersonasByNombre(nombre: String):Observable<Persona[]> {
        return this.http.get<Persona[]>(GlobalConstants.apiURL + "personas/nombre/"+nombre);
    }

    updatePersona(identificacion: String){
      const body = { identificacion: identificacion };
      return this.http.put<any>(`${GlobalConstants.apiURL}personas/identificacion`, body).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.error);
          }
          return throwError(e);
        }));
    }


    createPersona(persona: Persona): Observable<Persona> {
        return this.http.post(GlobalConstants.apiURL + "personas", persona)
          .pipe(
            map((response: any) => response.persona as Persona),
            catchError(e => {
              if (e.status == 400) {
                return throwError(e);
              }
              if (e.error.mensaje) {
                console.error(e.error.mensaje);
                return throwError(e);
              }
              return throwError(e);
            }));
      }

      eliminarPersona(identificacion: String): Observable<any> {
        return this.http.delete(`${GlobalConstants.apiURL}personas/${identificacion}`).pipe(
          catchError(e => {
            console.error(e.error.mensaje);
            return throwError(e);
          }));
        }
}
