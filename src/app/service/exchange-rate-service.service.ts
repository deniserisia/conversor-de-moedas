import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiKey = 'f813fe28ac72a9c62966039a'; // Sua chave de API aqui
  private baseUrl = 'https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) { }

  getExchangeRates(baseCurrency: string, targetCurrencies: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.apiKey}/latest/${baseCurrency}`);
  }
}
