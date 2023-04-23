import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { FailModalComponent } from './components/fail-modal/fail-modal.component';
import { MyGuard } from './guard/myGuard';

const routes: Routes = [
  {
    path: "test", component: AdminIndexComponent, canActivate: [MyGuard], data:{role:'Alo'}
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "Signup", component: SignupComponent
  },
  {
    path: "modal", component: LoadingModalComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}

