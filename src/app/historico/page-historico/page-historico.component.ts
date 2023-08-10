import { Component, OnInit, ViewChild } from '@angular/core';
import { Conversao, HistoricoService } from 'src/app/service/historico.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarExclusaoDialogComponent } from 'src/app/confirmar-exclusao-dialog/confirmar-exclusao-dialog.component';
import { MatTable } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page-historico',
  templateUrl: './page-historico.component.html',
  styleUrls: ['./page-historico.component.css']
})
export class PageHistoricoComponent implements OnInit {
  historico: Conversao[] = [];

  @ViewChild(MatTable) tabelaHistorico!: MatTable<any>;

  constructor(
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
    this.historico = this.historicoService.obterHistorico();
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
