import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListagemMoedasService } from 'src/app/service/listagem-moedas.service';

@Component({
  selector: 'app-page-moedas',
  templateUrl: './page-moedas.component.html',
  styleUrls: ['./page-moedas.component.css']
})
export class PageMoedasComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'name'];
  moedas: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listagemMoedasService: ListagemMoedasService) {}

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.listagemMoedasService.getAllSymbols().subscribe(
      (response) => {
        this.moedas = Object.keys(response.symbols).map((symbol) => ({
          symbol: symbol,
          name: response.symbols[symbol],
        }));

        this.dataSource = new MatTableDataSource(this.moedas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
