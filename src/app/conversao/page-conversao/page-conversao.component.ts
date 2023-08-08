import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
  isValueOver10000: boolean = false;
  
  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private historicoService: HistoricoService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        'high-value',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/imgs/sack-dollar-solid.svg')
      );
    }

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

              // Verifica se o valor convertido é maior que 10000 dólares
              this.isValueOver10000 = this.checkValueOver10000(this.toCurrency, this.convertedAmount);

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
    this.isValueOver10000 = false; // Reseta o estado do ícone
  }

  // Função para verificar se o valor convertido é maior que 10000 dólares
  checkValueOver10000(currency: string, amount: number): boolean {
    // Implemente a lógica de conversão da moeda de destino para dólar e verificação aqui
    return amount > 10000;
  }
}
