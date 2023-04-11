import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

const routes: Routes = [
  {
    path: "test", component: AdminIndexComponent
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

