import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(public navBar: NavbarService) {
    this.navBar.closeNav();
  }

  ngOndestroy() {
    this.navBar.openNav();
    this.navBar.setEvent("hello");
  }
}
