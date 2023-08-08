import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeService } from 'src/app/service/currency-exchange.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  currentRateToCurrency: number = 0;
  currentRateUsdToCurrency: number = 0;

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private currencyExchangeService: CurrencyExchangeService) {}

  ngOnInit(): void {
    this.fetchCurrentRates();
  }

  fetchCurrentRates() {
    this.currencyExchangeService.getExchangeRate('BRL', 'EUR').subscribe(
      (response) => {
        if (response && response.rates) {
          this.currentRateToCurrency = response.rates['EUR'];
        } else {
          console.error("Invalid API response or missing exchange rate data.");
        }
      },
      (error) => {
        console.error(error);
      }
    );

    this.currencyExchangeService.getExchangeRate('BRL', 'USD').subscribe(
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
}
