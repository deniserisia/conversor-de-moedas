import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversaoRoutingModule } from './conversao-routing.module';
import { PageConversaoComponent } from './page-conversao/page-conversao.component';


@NgModule({
  declarations: [
    PageConversaoComponent
  ],
  imports: [
    CommonModule,
    ConversaoRoutingModule
  ]
})
export class ConversaoModule { }
