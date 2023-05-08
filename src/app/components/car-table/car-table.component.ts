import { Component, OnInit } from '@angular/core';
import { modalType } from 'src/app/enums/modalType';
import { CarServiceService } from 'src/app/services/car-service.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css']
})
export class CarTableComponent implements OnInit{
  public content: String = "";
  public type: modalType = this.modalService.type;
  carlist: any[] = [];
  constructor(private carService: CarServiceService, private modalService: ModalService) {

  }
  ngOnInit(): void {
    this.modalService.showPopup = true;
    this.modalService.content = "Loading"
    this.modalService.type = modalType.Loading
    this.carService.getAllCars()
    .subscribe({
      next: (carResponse) =>
      {
        this.carlist = carResponse;
        this.modalService.showPopup = true;
        this.modalService.content = "Success"
        this.modalService.type = modalType.Success
        console.log(carResponse);
      },
      error: (response) =>
      {
        console.log(response);
      }
    })
  }
}
