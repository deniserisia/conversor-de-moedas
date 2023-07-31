import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService, ExchangeRate } from 'src/app/service/currency-exchange.service';

@Component({
  selector: 'app-page-conversao',
  templateUrl: './page-conversao.component.html',
  styleUrls: ['./page-conversao.component.css']
})
export class PageConversaoComponent implements OnInit {
  currencies!: string[]; // Lista de todas as moedas disponíveis
  fromCurrency!: string; // Moeda de origem selecionada
  toCurrency!: string; // Moeda de destino selecionada
  amount!: number; // Quantidade informada pelo usuário
  convertedAmount: number = 0; // Valor convertido a ser exibido para o usuário (inicializado com 0)

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
            const exchangeRate: ExchangeRate = response;
            this.convertedAmount = this.amount * exchangeRate.rates[this.toCurrency];
          },
          (error) => {
            console.error(error);
            this.convertedAmount = 0; // Em caso de erro, atribui 0 ao valor convertido
          }
        );
    } else {
      this.convertedAmount = 0; // Se algum dos campos não estiver preenchido, atribui 0 ao valor convertido
    }
  }
}