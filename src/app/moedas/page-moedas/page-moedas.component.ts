import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListagemMoedasService } from 'src/app/service/listagem-moedas.service';
import { Moeda, MoedasService } from 'src/app/service/moeda.service';


@Component({
  selector: 'app-page-moedas',
  templateUrl: './page-moedas.component.html',
  styleUrls: ['./page-moedas.component.css']
})
export class PageMoedasComponent implements OnInit {
  dataSource!: MatTableDataSource<Moeda>;
  displayedColumns: string[] = ['symbol', 'name']; // Adicione mais colunas conforme necessário

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  moedas: Moeda[] = [
    { symbol: 'USD', name: 'US Dollar' },
    { symbol: 'EUR', name: 'Euro' },
    // Adicione mais moedas conforme necessário
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.moedas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
