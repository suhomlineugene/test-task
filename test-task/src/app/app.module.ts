import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceProxyModule } from 'src/shared/service-proxy.module';
import { TableModule } from "primeng/table";
import { AppRoutingModule } from './app-routing.module';
import { PaginatorModule } from "primeng/paginator";
import { AppComponent } from './app.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceProxyModule,
    ChartModule,
    TableModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
