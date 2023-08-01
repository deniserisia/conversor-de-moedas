import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversaoRoutingModule } from './conversao-routing.module';
import { PageConversaoComponent } from './page-conversao/page-conversao.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Importe os módulos do Angular Material necessários aqui
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PageHistoricoComponent } from '../historico/page-historico/page-historico.component';
// Importe outros módulos do Angular Material que você esteja usando no componente



@NgModule({
  declarations: [
    PageConversaoComponent,
  ],
  imports: [
    CommonModule,
    ConversaoRoutingModule,
    FormsModule,
    RouterModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class ConversaoModule { }
