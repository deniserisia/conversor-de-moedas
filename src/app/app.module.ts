import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { FormsModule } from '@angular/forms';
import { TemplateModule } from './template/template.module';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { SubHeaderComponent } from './template/sub-header/sub-header.component';
import { ContatoModule } from './contato/contato.module';
import { ConversaoModule } from './conversao/conversao.module';
import { HistoricoModule } from './historico/historico.module';
import { MoedasModule } from './moedas/moedas.module';
import { ExchangeRateService } from './service/exchange-rate-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubHeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    TemplateModule,
    FormsModule,
    ContatoModule,
    ConversaoModule,
    HistoricoModule,
    MoedasModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [
    ExchangeRateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
