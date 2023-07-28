import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/app/service/exchange-rate-service.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  currencies: { name: string, rate: string }[] = [];
  currentIndex = 0;
  interval: any;
  carouselStyle: { transform: string } = { transform: 'translateX(0)' };
  
  isMenuOpen: boolean = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.fetchExchangeRates();
    this.startCarousel();
  }

  fetchExchangeRates() {
    const baseCurrency = 'BRL';
    const targetCurrencies = 'USD,EUR,GBP,JPY,AUD,CAD,CNY,INR,RUB,CHF,AED,SGD,HKD,SEK,NZD,ZAR';

    this.exchangeRateService.getExchangeRates(baseCurrency, targetCurrencies)
      .subscribe(
        (data: any) => {
          this.currencies = [
            { name: 'USD (Estados Unidos)', rate: data.conversion_rates.USD.toFixed(2) },
            { name: 'EUR (Europa)', rate: data.conversion_rates.EUR.toFixed(2) },
            { name: 'GBP (Reino Unido)', rate: data.conversion_rates.GBP.toFixed(2) },
            { name: 'JPY (Japão)', rate: data.conversion_rates.JPY.toFixed(2) },
            { name: 'AUD (Austrália)', rate: data.conversion_rates.AUD.toFixed(2) },
            { name: 'CAD (Canadá)', rate: data.conversion_rates.CAD.toFixed(2) },
            { name: 'CNY (Yuan Chinês)', rate: data.conversion_rates.CNY.toFixed(2) },
            { name: 'INR (Rúpia Indiana)', rate: data.conversion_rates.INR.toFixed(2) },
            { name: 'RUB (Rublo Russo)', rate: data.conversion_rates.RUB.toFixed(2) },
            { name: 'CHF (Franco Suíço)', rate: data.conversion_rates.CHF.toFixed(2) },
            { name: 'AED (Dirham dos Emirados Árabes Unidos)', rate: data.conversion_rates.AED.toFixed(2) },
            { name: 'SGD (Dólar de Singapura)', rate: data.conversion_rates.SGD.toFixed(2) },
            { name: 'HKD (Dólar de Hong Kong)', rate: data.conversion_rates.HKD.toFixed(2) },
            { name: 'SEK (Coroa Sueca)', rate: data.conversion_rates.SEK.toFixed(2) },
            { name: 'NZD (Dólar da Nova Zelândia)', rate: data.conversion_rates.NZD.toFixed(2) },
            { name: 'ZAR (Rand Sul-Africano)', rate: data.conversion_rates.ZAR.toFixed(2) },
          ];
          // Adicione as demais moedas e países ao array 'currencies'

          // Criamos uma cópia das moedas e adicionamos ao final da lista para o loop infinito
          this.currencies = [...this.currencies, ...this.currencies];
        },
        (error) => {
          console.error('Erro ao obter as cotações:', error);
        }
      );
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.currencies.length;
      this.carouselStyle.transform = `translateX(${-this.currentIndex * 100}%)`;
    }, 5000000); // Intervalo de 5 add mais 000 segundos para alterar as cotações (ajuste conforme preferir)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getCarouselStyle(): { transform: string } {
    return this.carouselStyle;
  }

  getCurrencyTransform(index: number): string {
    const offset = index - this.currentIndex;
    return `translateX(${offset * 100}%)`;
  }
}