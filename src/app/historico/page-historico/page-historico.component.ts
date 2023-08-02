import { Component, OnInit, ViewChild } from '@angular/core';
import { Conversao, HistoricoService } from 'src/app/service/historico.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarExclusaoDialogComponent } from 'src/app/confirmar-exclusao-dialog/confirmar-exclusao-dialog.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-page-historico',
  templateUrl: './page-historico.component.html',
  styleUrls: ['./page-historico.component.css']
})
export class PageHistoricoComponent implements OnInit {
  historico: Conversao[] = [];

  @ViewChild(MatTable) tabelaHistorico!: MatTable<any>;

  constructor(private historicoService: HistoricoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.historico = this.historicoService.obterHistorico();
  }

  limparHistorico() {
    this.historicoService.limparHistorico();
    this.historico = [];
    this.tabelaHistorico.renderRows(); // Atualiza a tabela após limpar o histórico
  }

  confirmarExclusao(conversao: Conversao) {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent, {
      data: { conversao: conversao }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.historicoService.excluirConversao(conversao);
        this.historico = this.historicoService.obterHistorico();
        this.tabelaHistorico.renderRows(); // Atualiza a tabela após excluir a conversão
      }
    });
  }

}
