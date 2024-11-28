import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private http = inject(HttpClient);
  registerPoint(userCode: string): Observable<string> {
    return this.http
      .post(
        `${environment.api}/timesheet`,
        { userCode },
        { responseType: 'text' }
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => {
          throw new Error(
            error.error || 'Erro desconhecido ao registrar o ponto'
          );
        })
      );
  }
}
