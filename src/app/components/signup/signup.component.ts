import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public submitted: boolean = false;
  public signupForm: FormGroup = null!;
  fileUpload: File = null!;
  constructor( private formBuilder: FormBuilder, private accountService:AccountService) {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
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
    console.log("File", this.fileUpload);
    let signupForm = this.signupForm;
      console.log("You are gud");
      let c = this.fileUpload;
      var promise =  new Promise(function (resolve, reject){
        let reader = new FileReader();
        reader.readAsDataURL(c);
        reader.onload = function (e){
          resolve(reader.result)
        }
      })

      promise.then(function (data){
        signupForm.controls["image"].setValue(data);
        //let rs = crewService.createCrew(createCrewForm.getRawValue());
        
    });
    console.log("json", this.signupForm.getRawValue());
    console.log("You are bad");
  }
  test() {
    if (this.signupForm.valid && this.fileUpload != null && this.passwordMatch()) {
      console.log("Gud to go");
      let c = this.fileUpload;
      let accountService = this.accountService;
      let signupForm = this.signupForm;
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
          }
        });
      });
    } else {
      console.log("You are bad");
    }   
  }
}

