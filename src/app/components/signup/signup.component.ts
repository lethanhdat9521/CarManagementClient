import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { modalType } from '../../enums/modalType';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public submitted: boolean = false;
  public signupForm: FormGroup = null!;
  public isPhoneDuplicated = false;
  public isEmailDuplicated = false;
  public content: String = "";
  public type: modalType = this.modalService.type;
  fileUpload: File = null!;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, public modalService: ModalService, private route: Router) {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern('^\\d{10}$')]],
      avatar:[""]
    })
  }
  passwordMatch() {
 
    if (this.signupForm.getRawValue()["password"] == this.signupForm.getRawValue()["confirmPassword"]) {
      return true;
    }
    return false;
  }
  handlePhone(e: Event) {
    const element = e.target as HTMLInputElement;
    if (element.value.length == 10) {
      console.log("Alo", element.value);
      this.accountService.isPhoneDuplicated(element.value).subscribe({
        next: data => {
          console.log("Inside", data);
          if ((<any>data).message == "True") {
            this.isPhoneDuplicated = true;
          } else {
            this.isPhoneDuplicated = false;
          }
        },
        error: data => {
        }
      })
    } else {
      this.isPhoneDuplicated = false;
    }
  }
  handleEmail(e: Event) {
    const element = e.target as HTMLInputElement;
    let reg = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
    if (reg.test(element.value)) {
      console.log("Alo", element.value);
      this.accountService.isEmailDuplicated(element.value).subscribe({
        next: data => {
          console.log("Inside", data);
          if ((<any>data).message == "True") {
            this.isEmailDuplicated = true;
          } else {
            this.isEmailDuplicated = false;
          }
        },
        error: data => {
        }
      })
    } else {
      this.isEmailDuplicated = false;
    }
  }
  handleFile(e: Event) {
    const element = e.target as HTMLInputElement;
    let fileString: string = "";
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
    }
    // @ts-ignore
    this.fileUpload = fileList.item(0)!;
    let reader = new FileReader();
    reader.readAsDataURL(this.fileUpload);
    reader.onload = function () {
      fileString = reader.result?.toString()!;
    }
  }
  getFormControl(name: string) {
    return this.signupForm.controls[name];
  }

  createAccount() {
    let modalService1 = this.modalService;
    if (this.signupForm.valid && this.fileUpload != null && this.passwordMatch()) {
      this.modalService.showPopup = true;
      this.modalService.content = "Signing up ";
      this.modalService.type = modalType.Loading;
      console.log("Gud to go");
      let c = this.fileUpload;
      let accountService = this.accountService;
      let signupForm = this.signupForm;
      let route = this.route;
      var promise = new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(c);
        reader.onload = function (e) {
          console.log("Done");
          resolve(reader.result)
        }
      })
      promise.then(function (data) {
        console.log("Promist", data);
        signupForm.controls["avatar"].setValue(data);
        console.log("json", signupForm.getRawValue());
        let rs = accountService.signUp(signupForm.getRawValue());
        rs.subscribe({
          next: data => {
            console.log("Inside", data);
            if ((<any>data).message == "1") {
              modalService1.content = "Signup successfully!";
              modalService1.type = modalType.Success;
              route.navigate(['login']);
            }
            
          }
        });
      });
    } else {
      console.log("You are bad");
      this.modalService.showPopup = true;
      this.modalService.content = "Signup fail!";
      this.modalService.type = modalType.Fail;
    }   
  }
}

