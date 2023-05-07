import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, map } from 'rxjs';
import { modalType } from '../../enums/modalType';
import { AuthInterceptor } from '../../inceptor/auth.interceptor';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';
import { FailModalComponent } from '../fail-modal/fail-modal.component';

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
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, public modalService: ModalService) {
    this.createForm();
    this.loginName = localStorage.getItem("loginName")!;
  }
  
  createForm() {
    this.loginForm = this.formBuilder.group({
      account: ["", [Validators.required]],
      password: ["", Validators.required]
    })
  }

  ngOnInit() {
    console.log("Oninit");
    
  }
  ngOnChanges() {
    console.log("Onchanges")
  }
  login() {
    this.modalService.showPopup = true;
    this.modalService.content = "Log you in ";
    this.modalService.type = modalType.Loading;
    console.log("alolo", this.loginForm.value["account"]);
    //console.log("Value", this.loginForm.value["account"]);
    this.accountService.login(this.loginForm.value).subscribe({
      next: (data => {
        console.log(data);
        this.modalService.showPopup = false;
        //AuthInterceptor.accessToken = data.accessToken;
        console.log("Hello", data);
        console.log("Hello1", (<any>data).o.role);
        sessionStorage.setItem("role", (<any>data).o.role);
        localStorage.setItem("loginName", this.loginForm.value["account"]);
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
    
    //this.failModal.setContent("hello");
    //this.failModal.unhide();
  }
}
