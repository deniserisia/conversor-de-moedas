import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/service/exchange-rate-service.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {
  cotacoes: any[] = [];

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit() {
    this.getCotacoes();
  }

  getCotacoes() {
    // Defina as moedas que você deseja obter as cotações (dólar, euro, Ibovespa)
    const moedas = 'USD,EUR,BRL';

    this.exchangeRateService.getExchangeRates('BRL', moedas).subscribe(
      (response) => {
        // O objeto de resposta conterá as cotações das moedas em relação ao real
        // Exemplo: response = { base_code: 'BRL', conversion_rates: { USD: 5.50, EUR: 6.20, BRL: 1.00 } }

        // Formata os dados para exibir na interface
        this.cotacoes = Object.keys(response.conversion_rates).map((moeda) => ({
          moeda: moeda,
          cotacao: response.conversion_rates[moeda]
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
