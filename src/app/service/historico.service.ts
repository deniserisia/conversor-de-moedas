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

  excluirConversao(conversao: Conversao) {
    console.log('Excluindo conversao - entrou:', conversao);
    const index = this.historico.indexOf(conversao);
    if (index > -1) {
      this.historico.splice(index, 1);
      console.log('Conversao removida, histórico atualizado:', this.historico);
    }
  }
  
}
