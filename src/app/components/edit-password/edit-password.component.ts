import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { modalType } from '../../enums/modalType';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent {
  public user: any;
  public submitted: boolean = false;
  public updateForm: FormGroup = null!;
  public isPhoneDuplicated = false;
  public isEmailDuplicated = false;
  public content: String = "";
  public type: modalType = this.modalService.type;
  fileUpload: File = null!;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, public modalService: ModalService, private route: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.formBuilder.group({
      newPassword: ["", [Validators.required]],
      oldPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
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
      console.log("avat", user);
    }
  }

  update() {
    this.modalService.showPopup = true;
    this.modalService.content = "Updating ";
    this.modalService.type = modalType.Loading;
    this.accountService.updatePassword(this.updateForm.getRawValue()).subscribe({
      next: (data => {
        console.log("awd", data);
        this.modalService.content = "Update password success!";
        this.modalService.type = modalType.Success;
      }),
      error: (data => {
        console.log("Fail", data);
        this.modalService.content = "Wrong password!";
        this.modalService.type = modalType.Fail;
      })
    })
    console.log("data", this.updateForm.getRawValue());
  }

  passwordMatch() {

    if (this.updateForm.getRawValue()["newPassword"] == this.updateForm.getRawValue()["confirmPassword"]) {
      return true;
    }
    return false;
  }
}
