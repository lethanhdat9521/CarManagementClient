import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TopNavComponent } from '../components/top-nav/top-nav.component';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public navBarShow: boolean = true;

  private event$: BehaviorSubject<string> = new BehaviorSubject("123");



  constructor() {
    console.log("Navbar Service constructor");
  }
  closeNav() {
    this.navBarShow = false;
  }
  openNav() {
    this.navBarShow = true;
  }

  setEvent(event: string) {
    this.event$.next(event);
  }

  getEvent() {
    return this.event$.asObservable();
  }

}
