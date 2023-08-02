import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Moeda {
  symbol: string;
  name: string;
  // Adicione mais propriedades conforme necessário
}

@Injectable({
  providedIn: 'root'
})
export class MoedasService {
  private apiUrl = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient) { }

  getMoedas() {
    return this.http.get<any>(this.apiUrl);
  }
}
