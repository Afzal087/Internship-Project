import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
apiUrl = 'http://localhost:8080/api/item';

  constructor(private https: HttpClient) {}

  get(): Observable<Item[]> {
    return this.https.get<Item[]>(this.apiUrl);
  }

  add(item: Item): Observable<Item> {
    return this.https.post<Item>(this.apiUrl, item);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.https.delete<void>(url);
  }
}
