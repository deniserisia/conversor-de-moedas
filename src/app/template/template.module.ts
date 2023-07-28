import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';


@NgModule({
  declarations: [
   // HeaderComponent,
   // FooterComponent,
   // SubHeaderComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ], exports:[
   // HeaderComponent,
   // FooterComponent,
   // SubHeaderComponent
  ]
})
export class TemplateModule { }
