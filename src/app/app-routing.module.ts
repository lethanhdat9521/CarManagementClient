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
import { CarListComponent } from './components/car-list/car-list.component';
import { MyGuard } from './guard/myGuard';
import { ProfileComponent } from './components/profile/profile.component';
import { EditPasswordComponent } from './components/edit-password/edit-password.component';
import { CarTableComponent } from './components/car-table/car-table.component';
import { CarCreateComponent } from './components/car-create/car-create.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ClientTableComponent } from './components/client-table/client-table.component';


const routes: Routes = [
  {
    path: "admin",
    children: [
      {
        path: "", component: AdminIndexComponent
      },
      {
        path: "carManagement",
        children: [
          {
            path: "", component: CarTableComponent
          },
          {
            path: "addcar", component: CarCreateComponent
          },
          {
            path: "UpdateCar/:id", component: CarUpdateComponent
          }
        ]
      }
    ]
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "modal", component: LoadingModalComponent
  },
  {
    path: "carlist", component: CarTableComponent
  },
  {
    path: "profile", component: ProfileComponent, canActivate: [MyGuard], data: { role: 'Admin' }
  },
  {
    path: "editPassword", component: EditPasswordComponent, canActivate: [MyGuard], data: { role: 'Admin' }
  },
  {
    path: "carcreate", component: CarCreateComponent
  },
  {
    path: "cartable/edit/:id", component: CarUpdateComponent
  },
  {
    path: "cartable", component: CarTableComponent
  },
  {
    path: "clienttable", component: ClientTableComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

