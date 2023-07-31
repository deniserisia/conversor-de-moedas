import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageContatoComponent } from './page-contato/page-contato.component';

const routes: Routes = [
  {path: 'contato', component: PageContatoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule { }
