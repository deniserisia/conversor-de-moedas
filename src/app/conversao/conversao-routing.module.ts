import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageConversaoComponent } from './page-conversao/page-conversao.component';

const routes: Routes = [
  {path:'conversao-de-moedas', component: PageConversaoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversaoRoutingModule { }
