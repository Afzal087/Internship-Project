import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  constructor(private customerService: CustomerService) {}

  getCountries(): Observable<any> {
    return this.customerService.getCountryData();
  }

  getStates(countryCode: string): Observable<any> {
    return this.customerService.getStateData(countryCode);
  }

  getCities(countryCode: string, stateCode: string): Observable<any> {
    return this.customerService.getCityData(countryCode, stateCode);
  }
}
