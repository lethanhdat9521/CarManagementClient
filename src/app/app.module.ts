import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './inceptor/auth.interceptor';
import { CarListComponent } from './components/car-list/car-list.component';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from '../environments/environment.development';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
import { CarTableComponent } from './components/car-table/car-table.component';
import { CarCreateComponent } from './components/car-create/car-create.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingModalComponent,
    FailModalComponent,
    SuccessModalComponent,
    AdminIndexComponent,
    TopNavComponent,
    LeftNavComponent,
    LoginComponent,
    SignupComponent,
    CarListComponent,
    WarningModalComponent,
    CarTableComponent,
    CarCreateComponent,
    CarUpdateComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterOutlet, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
