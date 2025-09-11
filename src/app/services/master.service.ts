import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'http://localhost:8080/api/assignments';

  constructor(private https: HttpClient) {}

  assignService(ids:any): Observable<any> {
  return this.https.post<any>(this.apiUrl, ids);
}



  getAssignment():any {
   return this.https.get<any>(this.apiUrl);
  }
}
