import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface ExchangeRate {
  base: string;
  date: string;
  rates: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

    private apiUrl = 'https://api.exchangerate.host/latest';
  
    constructor(private http: HttpClient) { }
  
    getAllCurrencies(): Observable<ExchangeRate> {
      return this.http.get<ExchangeRate>(this.apiUrl);
    }
  
    getExchangeRate(fromCurrency: string, toCurrency: string): Observable<ExchangeRate> {
      const url = `${this.apiUrl}?base=${fromCurrency}&symbols=${toCurrency}`;
      return this.http.get<ExchangeRate>(url);
    }
}