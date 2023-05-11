import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})

export class AdminIndexComponent {

  public adminStats: any;
  public user: any;
  public adminAccounts: any;

  constructor(public accountService: AccountService) {
    console.log("Faulttw123");
    //this.adminStats.totalCarSell = 0;
    //this.adminStats.totalIncomeAmount = 0;
    //this.adminStats.totalUserAccount = 0;
    //this.adminStats.totalAccess = 0;
    this.getAdminStats();
    this.getAdminAccounts();
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("UserInfor")!);
    if (this.user == null) {
      this.user.fullname = "123";
    }
  }

  getAdminStats() {
   
    this.accountService.getAdminStats().subscribe({
      next: (data => {
        this.adminStats = (<any>data).o;
        console.log("HG",(<any>data).o)
      }),
      error: (data => {
        this.adminStats.totalCarSell = 0;
        this.adminStats.totalIncomeAmount = 0;
        this.adminStats.totalUserAccount = 0;
        this.adminStats.totalAccess = 0;
        console.log("Fault")
      })
    })
  }

  getAdminAccounts() {
    this.accountService.getAdminAccounts().subscribe({
      next: (data => {
        this.adminAccounts = (<any>data);
        console.log("HG", (<any>data))
      })
    })
  }

}
