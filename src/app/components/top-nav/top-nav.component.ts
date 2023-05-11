import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  public user: any;


  constructor(private router: Router) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("UserInfor")!);
    console.log("test");
    if (this.user == null) {
      this.user.fullname = "123";
    }
  }
  logout() {
    localStorage.removeItem("UserInfor");
    localStorage.removeItem("AccessToken");
    this.router.navigate(["login"]);
  }

  navLogo() {
    let role = (<any>JSON.parse(localStorage.getItem("AccessToken")!).role);
    if (role == "Admin") {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(["carshow"]);
    }
  }
}
