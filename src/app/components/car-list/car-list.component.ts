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
  /**
   *
   */
  public content: String = "";
  public type: modalType = this.modalService.type;
  carlist: any[] = [];
  receiptInput: any = {
    carId: 1,
    accountId: 1
  };
  constructor(private carService: CarServiceService, public modalService: ModalService) {

  }
  ngOnInit(): void {
    this.carService.getAllCars()
    .subscribe({
      next: (carResponse) =>
      {
        this.carlist = carResponse;
        console.log(carResponse);
      },
      error: (response) =>
      {
        console.log(response);
      }
    })
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
}
