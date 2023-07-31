import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHistoricoComponent } from './page-historico/page-historico.component';

const routes: Routes = [
  {path:'historico-de-conversoes', component: PageHistoricoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRoutingModule { }
