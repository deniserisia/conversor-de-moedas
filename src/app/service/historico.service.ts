import { Injectable } from '@angular/core';

export interface Conversao {
  data: Date;
  moedaOrigem: string;
  valorEntrada: number;
  moedaDestino: string;
  valorSaida: number;
  taxaConversao: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private historico: Conversao[] = [];

  constructor() { }

  adicionarConversao(conversao: Conversao) {
    this.historico.push(conversao);
  }

  obterHistorico(): Conversao[] {
    return this.historico;
  }

  limparHistorico() {
    this.historico = [];
  }
}
