import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-exclusao-dialog',
  templateUrl: './confirmar-exclusao-dialog.component.html',
  styleUrls: ['./confirmar-exclusao-dialog.component.css']
})
export class ConfirmarExclusaoDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmarExclusaoDialogComponent>) { }

  confirmarExclusao() {
    this.dialogRef.close(true);
  }

  cancelarExclusao() {
    this.dialogRef.close(false);
  }
}
