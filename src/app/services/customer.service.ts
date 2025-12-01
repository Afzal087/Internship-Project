import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { Pipe } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  // backend
  apiUrl = 'http://localhost:8080/api/customer';

  // country
  ApiKey = environment.countryApiKey;
  baseURL = 'https://api.countrystatecity.in/v1/countries';

  constructor(private https: HttpClient) {}

  

  getCountryData(): Observable<any> {
    return this.https.get<any>(this.baseURL,{
      headers: {
        'X-CSCAPI-KEY': this.ApiKey
      }
    });
  }

  getStateData(code: string): Observable<any> {
    console.log("service ",code);
    return this.https.get<any>(this.baseURL+`/${code}/states`,{
      headers: {
        'X-CSCAPI-KEY': this.ApiKey
      }
    });
  }

  getCityData(countryCode: string, stateCode: string):Observable<any>{
   return this.https.get<any>(this.baseURL+`/${countryCode}/states/${stateCode}/cities`,{
      headers: {
        'X-CSCAPI-KEY': this.ApiKey
      }
    });
  }
  


 

}
