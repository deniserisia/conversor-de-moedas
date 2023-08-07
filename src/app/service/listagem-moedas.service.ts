import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Moedas } from '../moedas/page-moedas/moedas';

@Injectable({
  providedIn: 'root'
})
export class ListagemMoedasService {

  private apiUrl = 'https://api.exchangerate.host/';

  constructor(private http: HttpClient) { }

  getCoins(): Observable<Moedas[]> {
    return this.http.get<any>(this.apiUrl + 'symbols').pipe(
      map((response) => {
        return Object.keys(response.symbols).map((key) => ({
          code: key,
          description: response.symbols[key].description,
        }));
      })
    );
  }
}

