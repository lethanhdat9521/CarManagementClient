import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {
  public role: string = "";
  public user: any;
  constructor(public navBarService: NavbarService) {

  }
  ngOnInit() {
    this.setRole();
    this.navBarService.getEvent().subscribe(event => {
      if (event == "hello") {
        console.log("123");
        this.setRole();
      }
    })
  }

  setRole() {
    this.role = (<any>JSON.parse(localStorage.getItem("AccessToken")!).role);
    console.log("Role", this.role);
  }
}
