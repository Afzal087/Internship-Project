import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'http://localhost:8080/api/customer';

  constructor(private https: HttpClient) {}

  get(): Observable<Customer[]> {
    return this.https.get<Customer[]>(this.apiUrl);
  }

  add(customer: Customer): Observable<Customer> {
    return this.https.post<Customer>(this.apiUrl, customer);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.https.delete<void>(url);
  }
}
