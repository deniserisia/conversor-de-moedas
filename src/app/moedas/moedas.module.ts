import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; //
import { MatInputModule } from '@angular/material/input'; 

import { MoedasRoutingModule } from './moedas-routing.module';
import { PageMoedasComponent } from './page-moedas/page-moedas.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    PageMoedasComponent
  ],
  imports: [
    CommonModule,
    MoedasRoutingModule,
    MatTableModule, // Add MatTableModule here
    MatPaginatorModule, // Add MatPaginatorModule here
    MatInputModule, // Add MatInputModule here
    MatSortModule,
    MatTableModule,
  ]
})
export class MoedasModule { }
