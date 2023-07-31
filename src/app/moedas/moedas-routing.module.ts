import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMoedasComponent } from './page-moedas/page-moedas.component';

const routes: Routes = [
  {path: 'moedas', component:PageMoedasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoedasRoutingModule { }
