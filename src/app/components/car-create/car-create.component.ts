import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { modalType } from 'src/app/enums/modalType';
import { CarServiceService } from 'src/app/services/car-service.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit{
  public car: any;
  public brandList: any[] = [];
  public listofChosenBrand: number[] = [];
  public submitted: boolean = false;
  public createForm: FormGroup = null!;
  public content: String = "";
  public type: modalType = this.modalService.type;
  fileUpload: File = null!;
  /**
   *
   */
  constructor(private formBuilder: FormBuilder, private carService:CarServiceService ,public modalService: ModalService, private route: Router) {

  }
  ngOnInit(): void {
      this.validateForm();
      this.carService.getAllBrands()
    .subscribe({
      next: (brandResponse) =>
      {
        this.brandList = brandResponse;
        console.log(brandResponse);
      },
      error: (response) =>
      {
        console.log(response);
      }
    })
  }
  validateForm() {
    this.createForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      color: ["", [ Validators.required]],
      type: ["", [Validators.required]],
      available: ["", [Validators.required]],
      price: ["", [Validators.required]],
      image: [""],
      brandId:[""],
    })
  }
  getFormControl(name: string) {
    return this.createForm.controls[name];
  }

  handleFile(e: Event) {
    let temp = this.createForm;
    // let car = this.car;
    const element = e.target as HTMLInputElement;
    let fileString: string = "";
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
    }
    // @ts-ignore
    this.fileUpload = fileList.item(0)!;
    let reader = new FileReader();
    console.log(this.fileUpload);
    reader.readAsDataURL(this.fileUpload);
    reader.onload = function (e) {
      // car.image = reader.result?.toString();
      console.log("img");
      temp.controls["image"].setValue(reader.result?.toString());
    }
  }
  create() {
    this.carService.addCar(this.createForm.getRawValue()).subscribe({
      next: (data => {
        console.log("awd",data);
      }),
      error: (data => {
        console.log("Fail", data);
      })
    })
    console.log("data", this.createForm.getRawValue());
  }

  chooseBrand(e : Event){
    console.log("cc",(e.target as HTMLInputElement).value);
    this.createForm.controls['brandId'].setValue((e.target as HTMLInputElement).value)
  }
}
