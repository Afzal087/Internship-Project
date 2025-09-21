import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { Pipe } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'http://localhost:8080/api/customer';
  countryUrl = 'https://api.first.org/data/v1/countries?offset=0&limit=249';

  constructor(private https: HttpClient) {}

  get(): Observable<any> {
    return this.https.get<any>(this.apiUrl);
    }
  

 getCountry(): Observable<any> {
  return this.https.get<any>(this.countryUrl).pipe(
    map(response => {
      return Object.entries(response.data).map(([code,info]:[string,any])=>({
        code:code,
        country: info.country,
        region: info.region
      }));
    })
  );
}

  add(customer: Customer): Observable<Customer> {
    console.log(customer)
    return this.https.post<Customer>(this.apiUrl, customer);
    
  }


  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.https.delete<void>(url);
  }
}
