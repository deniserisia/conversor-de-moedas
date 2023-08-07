import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator'; //
import { MatInputModule } from '@angular/material/input'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MoedasRoutingModule } from './moedas-routing.module';
import { PageMoedasComponent } from './page-moedas/page-moedas.component';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PageMoedasComponent
  ],
  imports: [
    CommonModule,
    MoedasRoutingModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatInputModule, 
    MatSortModule,
    MatTableModule,
    NgxPaginationModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class MoedasModule { }
