import { Component, Injectable } from '@angular/core';
import { ModalService } from '../../services/modal.service';



@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-fail-modal',
  templateUrl: './fail-modal.component.html',
  styleUrls: ['./fail-modal.component.css']
})
export class FailModalComponent {
  public content: string = 'Something wrong!';

  constructor(private modalService: ModalService) {
    // naviSer.hide();
    // footerSer.hide();
    document.body.style.overflowY = "hidden";
    console.log("Fail modal construct");
    this.content = modalService.content;
  }
  hide() {
    //const d = document.getElementsByClassName("outside");
    //let c = d.item(0) as HTMLElement;
    //console.log(c);
    //c.style.display = "none";
    //document.body.style.overflowY = "scroll";
    this.modalService.showPopup = false;
  }
  ngOnDestroy() {
    console.log("Destroy");
  }
  //unhide() {
  //  const d = document.getElementsByClassName("outside");
  //  let c = d.item(0) as HTMLElement;
  //  console.log(c);
  //  c.style.display = "block";
  //  document.body.style.overflowY = "scroll";
  //}
  //ngOnInit() {
  //  console.log("Modal ngOnit");
  //}
  //ngOnChanges() {
  //  console.log("")
  //}
}
