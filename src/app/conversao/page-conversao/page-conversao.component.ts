import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService, ExchangeRate } from 'src/app/service/currency-exchange.service';

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

  constructor(private currencyExchangeService: CurrencyExchangeService) { }

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
  }
  
  clearForm() {
    this.amount = 0;
    this.convertedAmount = 0;
  }
}
