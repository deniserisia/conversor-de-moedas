import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import { PageHistoricoComponent } from './page-historico/page-historico.component';


@NgModule({
  declarations: [
    PageHistoricoComponent
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule
  ]
})
export class HistoricoModule { }
