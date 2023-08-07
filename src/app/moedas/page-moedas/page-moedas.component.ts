import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { AlphaMoedasService } from 'src/app/service/alpha-moedas.service';
import { Moeda } from 'src/app/service/moeda.service';
import { Moedas } from '../moedas';
import { ListagemMoedasService } from 'src/app/service/listagem-moedas.service';


@Component({
  selector: 'app-page-moedas',
  templateUrl: './page-moedas.component.html',
  styleUrls: ['./page-moedas.component.css']
})
export class PageMoedasComponent implements OnInit {
  coinList: Moedas[] = [];
  coinListCompleta: Moedas[] = [];
  totalMoedas: number = 0;
  paginaAtual = 1;
  itensPorPagina = 5
  busca: string = '';
  campoOrdenacao: string = 'code';
  filtroOrdenacao: string = 'symbolAsc'
  loading = true;

  constructor(private listagemMoedasService: ListagemMoedasService) { }

  ngOnInit(): void {
    this.carregarCoinList();
  }

  carregarCoinList() {
    this.listagemMoedasService.getCoins().subscribe({
      next: (coins: Moedas[]) => {
        this.coinListCompleta = coins;
        this.coinList = this.coinListCompleta.slice();
        this.totalMoedas = this.coinList.length;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  buscarCoins() {
    const valorBusca = this.busca.trim().toLowerCase();

    if (!valorBusca) {
      this.coinList = this.coinListCompleta.slice(); // Restaurar a lista completa
      this.totalMoedas = this.coinListCompleta.length; // Atualizar o total de moedas
      this.ordenarPor(this.filtroOrdenacao);
    } else {
      this.coinList = this.coinListCompleta.filter(coin =>
        this.verificarTexto(coin.code, valorBusca) ||
        this.verificarTexto(coin.description, valorBusca)
      );
      this.totalMoedas = this.coinList.length; // Atualizar o total de moedas após a busca
    }

    // Verificar se a página atual está fora dos limites após a busca
    if (this.paginaAtual > Math.ceil(this.totalMoedas / this.itensPorPagina)) {
      this.paginaAtual = Math.max(1, Math.ceil(this.totalMoedas / this.itensPorPagina));
    }
  }

  private verificarTexto(texto: string, valorBusca: string): boolean {
    return texto.toLowerCase().includes(valorBusca);
  }

  limparBusca() {
    this.busca = '';
    this.coinList = this.coinListCompleta.slice();
    this.totalMoedas = this.coinListCompleta.length;
    this.ordenarPor(this.filtroOrdenacao);
  }

  ordenarPor(opcao: string) {
    this.filtroOrdenacao = opcao;
    switch (opcao) {
      case 'symbolAsc':
        this.coinList.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case 'symbolDesc':
        this.coinList.sort((a, b) => b.code.localeCompare(a.code));
        break;
      case 'descriptionAsc':
        this.coinList.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'descriptionDesc':
        this.coinList.sort((a, b) => b.description.localeCompare(a.description));
        break;
      default:
        break;
    }
  }

  atualizarPaginacao(pagina: number) {
    this.paginaAtual = pagina;
    if (!this.itensPorPagina) {
      this.itensPorPagina = 5;
    }
  }
}