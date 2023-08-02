import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Conversao } from '../service/historico.service';

@Component({
  selector: 'app-confirmar-exclusao-dialog',
  templateUrl: './confirmar-exclusao-dialog.component.html',
  styleUrls: ['./confirmar-exclusao-dialog.component.css']
})
export class ConfirmarExclusaoDialogComponent {

  conversao: Conversao;

  constructor(
    private dialogRef: MatDialogRef<ConfirmarExclusaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.conversao = data.conversao; // Obtem a conversao do parâmetro passado
  }

  confirmarExclusao() {
    this.dialogRef.close(true);
  }

  cancelarExclusao() {
    this.dialogRef.close(false);
  }
}
