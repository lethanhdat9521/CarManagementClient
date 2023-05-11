import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modalType } from 'src/app/enums/modalType';
import { CarServiceService } from 'src/app/services/car-service.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent {
  public carImg: string ="";
  public carBrand: any;
  public carBrandId: any;
  public idNumber: number = 0;
  public car: any;
  public brandList: any[] = [];
  public listofChosenBrand: number[] = [];
  public submitted: boolean = false;
  public updateForm: FormGroup = null!;
  public content: String = "";
  public type: modalType = this.modalService.type;
  fileUpload: File = null!;
  /**
   *
   */
  constructor(private route: ActivatedRoute ,private formBuilder: FormBuilder, private carService:CarServiceService ,public modalService: ModalService, private router: Router) {

  }
  ngOnInit(): void {
    //set value too long, so make a modal to wait
    this.modalService.showPopup = true;
    this.modalService.content = "Loading"
    this.modalService.type = modalType.Loading
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if(id){
          console.log(id);
          this.idNumber = +id;
          this.carService.getCar(this.idNumber).subscribe({
            next: (response) => {
              console.log(response);
              this.updateForm.setValue({
                id: response.id,
                name: response.name,
                color: response.color,
                type: response.type,
                available: response.available,
                price: response.price,
                image: response.image,
                brandId: ""

              });
              this.carImg = response.image;
              this.carBrand = response.brandName;
              console.log("carbrand" ,this.carBrand);
            }

          });
        }
      }
    })
      this.validateForm();
      this.carService.getAllBrands()
    .subscribe({
      next: (brandResponse) =>
      {
        this.brandList = brandResponse;
        this.modalService.showPopup = true;
        this.modalService.content = "Success"
        this.modalService.type = modalType.Success
        console.log(brandResponse);
      },
      error: (response) =>
      {
        console.log(response);
      }
    })
  }
  validateForm() {
    this.updateForm = this.formBuilder.group({
      id: [""],
      name: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      color: ["", [ Validators.required], Validators.maxLength(20), Validators.minLength(2)],
      type: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
      available: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(1000), Validators.max(20000000)]],
      image: [""],
      brandId: ""
    })
    // this.updateForm.setValue({
    //   brandId: ""
    // })
  }
  get id(): FormControl {
    return this.updateForm.get("id") as FormControl;
  }
  // get brandId(): FormControl {
  //   return this.updateForm.get("brandId") as FormControl;
  // }

  getFormControl(name: string) {
    return this.updateForm.controls[name];
  }

  handleFile(e: Event) {
    let temp = this.updateForm;
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

  update(){
    this.carService.updateCar(this.id.value, this.updateForm.value)
    .subscribe({
      next: (response) => {
        this.router.navigate(['cartable'])
      }
    })
  }

  delete(){
    this.carService.deleteCar(this.id.value)
    .subscribe({
      next: (statusCode) => {
        if (statusCode == 1){
          this.router.navigate(['cartable'])
        }
      }
    })
  }

  chooseBrand(e : Event){
    console.log("cc",(e.target as HTMLInputElement).value);
    this.updateForm.controls['brandId'].setValue((e.target as HTMLInputElement).value)
  }
}

