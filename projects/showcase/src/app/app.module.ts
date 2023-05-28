import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxResponsiveDatatableModule } from 'ngx-responsive-datatable';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxResponsiveDatatableModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
