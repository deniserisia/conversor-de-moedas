import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoedasRoutingModule } from './moedas-routing.module';
import { PageMoedasComponent } from './page-moedas/page-moedas.component';


@NgModule({
  declarations: [
    PageMoedasComponent
  ],
  imports: [
    CommonModule,
    MoedasRoutingModule
  ]
})
export class MoedasModule { }
