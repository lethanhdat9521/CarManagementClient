import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  public user: any;


  constructor(private router: Router, public navbarService: NavbarService) {
    console.log("This is constructor of top nav");
  }

  ngOnInit() { 
    //interval(500).subscribe(() => {
    //  this.user = JSON.parse(localStorage.getItem("UserInfor")!);
    //  console.log("This is ngOnInit of top nav");

    //});
    this.navbarService.getEvent().subscribe(event => {
      if (event == "hello") {
        this.showNavbar();
      }
    })
    this.showNavbar();
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

  showNavbar() {
    this.user = JSON.parse(localStorage.getItem("UserInfor")!);
    console.log("Show r");
  }
  hideNavbar() {
    document.getElementById("blabla")!.style.display = "none";
  }
}
