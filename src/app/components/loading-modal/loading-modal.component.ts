import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent {
  content: string = '';
  timeLeft: number = 1.5;
  interval;
  constructor(private modalService: ModalService) {
    this.content = modalService.content;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 0.5;
        this.content = this.content + '.';
      } else {
        this.content = this.content.substring(0, this.content.length - 3);
        this.timeLeft = 1.5;
      }
    }, 500)
  }

  hide() {
    this.modalService.showPopup = false;
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
