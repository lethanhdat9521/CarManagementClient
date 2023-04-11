import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { FailModalComponent } from './components/fail-modal/fail-modal.component';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingModalComponent,
    FailModalComponent,
    SuccessModalComponent,
    AdminIndexComponent,
    TopNavComponent,
    LeftNavComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterOutlet, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
