import { Component } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {
  public user: any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("UserInfor")!);
    console.log("test");
    if (this.user == null) {
      this.user.fullname = "123";
    }
  }
}
