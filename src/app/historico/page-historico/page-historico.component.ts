import { Component, OnInit } from '@angular/core';
import { Conversao, HistoricoService } from 'src/app/service/historico.service';

@Component({
  selector: 'app-page-historico',
  templateUrl: './page-historico.component.html',
  styleUrls: ['./page-historico.component.css']
})
export class PageHistoricoComponent implements OnInit {
  historico: Conversao[] = [];

  constructor(private historicoService: HistoricoService) { }

  ngOnInit() {
    this.historico = this.historicoService.obterHistorico();
  }

  limparHistorico() {
    this.historicoService.limparHistorico();
    this.historico = [];
  }
}
