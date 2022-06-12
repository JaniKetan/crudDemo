import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getCrudData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  setCrudData(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/inventory`, data)
      .pipe(catchError(this.handleError));
  }

  updateCrudData(id: any, data: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/inventory/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteCrudData(id: any): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/inventory/${id}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
