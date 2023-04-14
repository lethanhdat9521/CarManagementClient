import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { modalType } from '../../enums/modalType';
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

  interval: any;
  timeLeft: number = 5;
  
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, public modalService: ModalService) {
    this.createForm();
    
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
    this.accountService.login(this.loginForm.value).subscribe({
      next: (data => {
        console.log(data);
        this.modalService.showPopup = false;
        
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
