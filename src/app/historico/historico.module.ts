import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import { PageHistoricoComponent } from './page-historico/page-historico.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Importe os módulos do Angular Material necessários aqui
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    PageHistoricoComponent,
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    FlexLayoutModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    MatDialogModule, // Add MatDialogModule
    MatIconModule
  ]
})
export class HistoricoModule { }
