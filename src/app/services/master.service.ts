import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assign } from '../models/assignment.model';
import { Observable } from 'rxjs';
import { AssignmentRequest } from '../models/AssignRequest.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'http://localhost:8080/api/assignments';

  constructor(private https: HttpClient) {}


  assignService(ids:any): Observable<any> {
    console.log(ids)
  return this.https.post<any>(this.apiUrl, ids);


}

  getAssignment():Observable<Assign[]> {
   return this.https.get<Assign[]>(this.apiUrl);
  }
}
