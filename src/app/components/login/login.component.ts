import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, map } from 'rxjs';
import { modalType } from '../../enums/modalType';
import { AuthInterceptor } from '../../inceptor/auth.interceptor';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';
import { NavbarService } from '../../services/navbar.service';
import { FailModalComponent } from '../fail-modal/fail-modal.component';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup = null!;
  public loginFail: Boolean = false;
  public content: String = "";
  public type: modalType = this.modalService.type;
  public loginName: string = "";

  interval: any;
  timeLeft: number = 5;
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, public modalService: ModalService, public router: Router, public navBar: NavbarService) {
    console.log("Login Constructor", this.navBar.navBarShow);
    this.createForm();
    this.loginName = localStorage.getItem("loginName")!;
    this.navBar.closeNav();
  }
  
  createForm() {
    this.loginForm = this.formBuilder.group({
      account: ["", [Validators.required]],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {
    let role = (<any>JSON.parse(localStorage.getItem("AccessToken")!).role);
    if (!this.accountService.isAccessTokenExpired() && role!=null) {
      this.navBar.setEvent("hello");
      this.navBar.openNav();
      if (role == "Admin") {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(["carshow"]);
      }
    }
    
  }
  login() {
    this.modalService.showPopup = true;
    this.modalService.content = "Log you in ";
    this.modalService.type = modalType.Loading;
    //console.log("Value", this.loginForm.value["account"]);
    this.accountService.login(this.loginForm.value).subscribe({
      next: (data => {
        this.modalService.showPopup = false;
        //AuthInterceptor.accessToken = data.accessToken;
        localStorage.setItem("AccessToken", JSON.stringify((<any>data).o));
        localStorage.setItem("loginName", this.loginForm.value["account"]);
        AuthInterceptor.accessToken = (<any>data).o.token;
        this.accountService.getAccountInfo().subscribe({
          next: (data1 => {
            console.log("adwdad ", (<any>data1));
            localStorage.setItem("UserInfor", JSON.stringify(<any>data1));
            let role = (<any>JSON.parse(localStorage.getItem("AccessToken")!).role);
            this.navBar.setEvent("hello");
            this.navBar.openNav();
            if (role == "Admin") {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(["carshow"]);
            }
          }),
          error: (data => {
          })
        })
      }),
      error: (data => {
        this.modalService.showPopup = true;
        this.modalService.content = "Server are down!";
        this.modalService.type = modalType.Fail;
        console.log(data);
        if (data.error.status == 404) {
          this.modalService.content = data.error.message;
        }
        console.log("Down", this.modalService.type);
      })
    });
    

  }
}
