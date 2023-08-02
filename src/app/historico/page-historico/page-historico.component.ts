import { Component, OnInit } from '@angular/core';
import { Conversao, HistoricoService } from 'src/app/service/historico.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarExclusaoDialogComponent } from 'src/app/confirmar-exclusao-dialog/confirmar-exclusao-dialog.component';

@Component({
  selector: 'app-page-historico',
  templateUrl: './page-historico.component.html',
  styleUrls: ['./page-historico.component.css']
})
export class PageHistoricoComponent implements OnInit {
  historico: Conversao[] = [];

  constructor(private historicoService: HistoricoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.historico = this.historicoService.obterHistorico();
  }

  limparHistorico() {
    this.historicoService.limparHistorico();
    this.historico = [];
  }

  confirmarExclusao(conversao: Conversao) {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.historicoService.excluirConversao(conversao);
        this.historico = this.historicoService.obterHistorico();
      }
    });
  }

  
}

