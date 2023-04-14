import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {
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
