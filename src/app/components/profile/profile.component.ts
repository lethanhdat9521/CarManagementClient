import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { modalType } from '../../enums/modalType';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public user: any;
  public submitted: boolean = false;
  public updateForm: FormGroup = null!;
  public isPhoneDuplicated = false;
  public isEmailDuplicated = false;
  public content: String = "";
  public type: modalType = this.modalService.type;
  fileUpload: File = null!;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, public modalService: ModalService, private route: Router) {
    this.user = JSON.parse(localStorage.getItem("UserInfor")!);
    console.log("test");
    if (this.user == null) {
      this.user.fullname = "123";
    }
  }

  ngOnInit() {
    
    this.createForm();
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      phone: ["", [Validators.required, Validators.pattern('^\\d{10}$')]],
      avatar: [""]
    })
    this.updateForm.setValue({
      fullName: this.user.fullname,
      email: this.user.email,
      phone: this.user.phone,
      avatar:""
    })
  }

  getFormControl(name: string) {
    return this.updateForm.controls[name];
  }

  handleFile(e: Event) {
    let user = this.user;
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
      user.avatar = reader.result?.toString();
      console.log("avat",user);
    }
  }

  update() {
    this.accountService.updateInfo(this.updateForm.getRawValue()).subscribe({
      next: (data => {
        console.log("awd",data);
      }),
      error: (data => {
        console.log("Fail", data);
      })
    })
    console.log("data", this.updateForm.getRawValue());
  }


}
