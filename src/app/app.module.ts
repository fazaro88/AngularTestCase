import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import {
   ApiService,
   PagerService
 } from './shared/services';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, PagerService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
