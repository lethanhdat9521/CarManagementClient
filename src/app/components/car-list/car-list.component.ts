import { Component, OnInit } from '@angular/core';
import { modalType } from 'src/app/enums/modalType';
import { CarServiceService } from 'src/app/services/car-service.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  public content: String = "";
  public type: modalType = this.modalService.type;
  public currentPages: number = 1;
  public totalPages: number = 15;
  public pages: number[] = [];
  public oldPage: number = 1;

  carlist: any[] = [];
  receiptInput: any = {
    carId: 1,
    accountId: 1
  };

  constructor(private carService: CarServiceService, public modalService: ModalService) {
    this.getTotalPages();
  }

  ngOnInit(): void {
    //this.carService.getAllCars()
    //.subscribe({
    //  next: (carResponse) =>
    //  {
    //    this.carlist = carResponse;
    //    console.log(carResponse);
    //  },
    //  error: (response) =>
    //  {
    //    console.log(response);
    //  }
    //})
    this.getCarListPagination(this.currentPages);
  }

  buy(carId: number, accountId: number){
    this.modalService.showPopup = true;
    this.modalService.content = "Buying"
    this.modalService.type = modalType.Loading
    this.receiptInput.carId = carId
    this.receiptInput.accountId = accountId
    this.carService.createReceipt(this.receiptInput)
    .subscribe({
      next: (response) =>
      {
        console.log(response);
        this.modalService.showPopup = true;
        this.modalService.content = "Buying success"
        this.modalService.type = modalType.Success
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTotalPages() {
    this.carService.getCarTotalPage().subscribe({
      next: (data) => {
        this.totalPages = (<any>data).message;
        this.generatePages((<any>data).message);
        console.log("total", this.totalPages);
      }
    })
  }

  getCarListPagination(page: number) {
    this.currentPages = page;
    this.modalService.showPopup = true;
    this.modalService.type = modalType.Loading;
    this.modalService.content = "Getting car";
    this.carService.getAllCarsListPagination(page).subscribe({
      next: (data) => {
        if (this.oldPage != this.currentPages) {
          document.getElementById("pageIdButton" + this.oldPage)!.style.backgroundColor = "white";
        }
        document.getElementById("pageIdButton" + page)!.style.backgroundColor = "grey";
        this.carlist = (<any>data).o;
        this.oldPage = this.currentPages;
        this.modalService.showPopup = false;
        console.log((<any>data).o);
      }
    })
  }

  generatePages(length: number) {
    for (let i = 1; i <= length; i++)
    {
      this.pages.push(i);
      console.log(this.pages);
    }
  }

}
