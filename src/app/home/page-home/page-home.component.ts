import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmarExclusaoDialogComponent } from 'src/app/confirmar-exclusao-dialog/confirmar-exclusao-dialog.component';
import { HistoricoService, Conversao } from 'src/app/service/historico.service';
import { CurrencyExchangeService, ExchangeRate } from 'src/app/service/currency-exchange.service';

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

  historico: Conversao[] = [];

  @ViewChild(MatTable) tabelaHistorico!: MatTable<any>;

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private historicoService: HistoricoService,
    public dialog: MatDialog,
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
    this.historico = this.historicoService.obterHistorico();
  }

  getCurrencies() {
    this.currencyExchangeService.getAllCurrencies().subscribe(
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
      this.currencyExchangeService.getExchangeRate(this.fromCurrency, this.toCurrency).subscribe(
        (response) => {
          if (response && response.rates && response.rates[this.toCurrency]) {
            this.exchangeRate = response;
            this.convertedAmount = this.amount * this.exchangeRate.rates[this.toCurrency];

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
            console.error('Invalid API response or missing exchange rate data.');
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

  limparHistorico() {
    this.historicoService.limparHistorico();
    this.historico = [];
    this.tabelaHistorico.renderRows();
  }

  confirmarExclusao(conversao: Conversao) {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent, {
      data: { conversao: conversao }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.historicoService.excluirConversao(conversao);
        this.historico = this.historicoService.obterHistorico();
        this.tabelaHistorico.renderRows();
      }
    });
  }

  isValueOver10000(currency: string, amount: number): boolean {
    // Implemente a lógica de conversão da moeda de destino para dólar e verificação aqui
    return amount > 10000;
  }
}
