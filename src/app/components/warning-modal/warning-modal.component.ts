import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent {
  content!: string;
  show: boolean = true;
  ngOninit() {
  }
  constructor(private modalService: ModalService) {
    this.content = modalService.content;
  }
  hide() {
    this.modalService.showPopup = false;
  }
}
