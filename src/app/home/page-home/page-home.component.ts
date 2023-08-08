import { Component, OnInit } from '@angular/core';
import { ExchangeRate, CurrencyExchangeService } from 'src/app/service/currency-exchange.service';
import { ExchangeRateService } from 'src/app/service/exchange-rate-service.service';
import { HistoricoService, Conversao } from 'src/app/service/historico.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {
  currencies!: string[]; 
  fromCurrency!: string; 
  toCurrency!: string; 
  amount!: number; 
  convertedAmount: number = 0;
  exchangeRate: ExchangeRate = {
    base: '',
    date: '',
    rates: {}
  };

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private historicoService: HistoricoService) { }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.currencyExchangeService.getAllCurrencies()
      .subscribe(
        (response) => {
          this.currencies = Object.keys(response.rates);
          this.fromCurrency = this.currencies[0]; // Define a primeira moeda da lista como moeda de origem padrão
          this.toCurrency = this.currencies[1]; // Define a segunda moeda da lista como moeda de destino padrão
        },
        (error) => {
          console.error(error);
        }
      );
  }

  convertCurrency() {
    if (this.amount && this.fromCurrency && this.toCurrency) {
      this.currencyExchangeService.getExchangeRate(this.fromCurrency, this.toCurrency)
        .subscribe(
          (response) => {
            if (response && response.rates && response.rates[this.toCurrency]) {
              this.exchangeRate = response;
              this.convertedAmount = this.amount * this.exchangeRate.rates[this.toCurrency];
            } else {
              console.error("Invalid API response or missing exchange rate data.");
              this.convertedAmount = 0;
            }
          },
          (error) => {
            console.error(error);
            this.convertedAmount = 0;
          }
        );
    } else {
      this.convertedAmount = 0;
    }

    if (this.amount && this.fromCurrency && this.toCurrency) {
      this.currencyExchangeService.getExchangeRate(this.fromCurrency, this.toCurrency)
        .subscribe(
          (response) => {
            if (response && response.rates && response.rates[this.toCurrency]) {
              this.exchangeRate = response;
              this.convertedAmount = this.amount * this.exchangeRate.rates[this.toCurrency];

              // Adiciona a conversão ao histórico
              const conversao: Conversao = {
                data: new Date(),
                moedaOrigem: this.fromCurrency,
                valorEntrada: this.amount,
                moedaDestino: this.toCurrency,
                valorSaida: this.convertedAmount,
                taxaConversao: this.exchangeRate.rates[this.toCurrency]
              };
              this.historicoService.adicionarConversao(conversao);
            } else {
              console.error("Invalid API response or missing exchange rate data.");
              this.convertedAmount = 0;
            }
          },
          (error) => {
            console.error(error);
            this.convertedAmount = 0;
          }
        );
    } else {
      this.convertedAmount = 0;
    }
  }
  
  clearForm() {
    this.amount = 0;
    this.convertedAmount = 0;
  }
}
