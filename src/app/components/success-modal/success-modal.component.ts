import { Component } from '@angular/core';

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
  constructor() {
    this.content = "Very null";
  }
  hide(){
    this.show = false;
    this.content += this.content
  }
  setContent(content: string) {
    this.content = content;
  }
}
