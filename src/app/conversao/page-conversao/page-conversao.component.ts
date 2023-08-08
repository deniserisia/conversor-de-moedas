import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService, ExchangeRate } from 'src/app/service/currency-exchange.service';
import { HistoricoService } from 'src/app/service/historico.service';

interface Conversao {
  data: Date;
  moedaOrigem: string;
  valorEntrada: number;
  moedaDestino: string;
  valorSaida: number;
  taxaConversao: number;
}

@Component({
  selector: 'app-page-conversao',
  templateUrl: './page-conversao.component.html',
  styleUrls: ['./page-conversao.component.css']
})
export class PageConversaoComponent implements OnInit {
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
  
  currentRateFromCurrency: number = 1; // Valor fixo para Real Brasileiro (BRL)
  currentRateToCurrency: number = 0;
  currentRateUsdToCurrency: number = 0;
  currentRateEurToCurrency: number = 0;

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
          this.fromCurrency = 'BRL';
          this.toCurrency = 'USD'; // Defina Dólar Americano como moeda de destino padrão
          this.fetchCurrentRates();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  fetchCurrentRates() {
    this.currencyExchangeService.getExchangeRate(this.fromCurrency, this.toCurrency)
      .subscribe(
        (response) => {
          if (response && response.rates) {
            this.currentRateFromCurrency = 1;
            this.currentRateToCurrency = response.rates[this.toCurrency];
            this.fetchCurrentRatesForOtherCurrencies(); // Busca os valores para as outras moedas
          } else {
            console.error("Invalid API response or missing exchange rate data.");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  fetchCurrentRatesForOtherCurrencies() {
    // Busca a taxa de câmbio para o Euro
    this.currencyExchangeService.getExchangeRate(this.fromCurrency, 'EUR')
      .subscribe(
        (response) => {
          if (response && response.rates) {
            this.currentRateEurToCurrency = response.rates['EUR'];
            // Após buscar o valor do Euro, busca o valor do Dólar
            this.fetchCurrentRateUsdToCurrency();
          } else {
            console.error("Invalid API response or missing exchange rate data.");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  fetchCurrentRateUsdToCurrency() {
    // Busca a taxa de câmbio para o Dólar
    this.currencyExchangeService.getExchangeRate(this.fromCurrency, 'USD')
      .subscribe(
        (response) => {
          if (response && response.rates) {
            this.currentRateUsdToCurrency = response.rates['USD'];
          } else {
            console.error("Invalid API response or missing exchange rate data.");
          }
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
              this.convertedAmount = this.amount * this.exchangeRate.rates[this.toCurrency] * this.currentRateFromCurrency;

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
