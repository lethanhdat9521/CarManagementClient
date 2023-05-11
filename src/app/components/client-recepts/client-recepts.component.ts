import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-client-recepts',
  templateUrl: './client-recepts.component.html',
  styleUrls: ['./client-recepts.component.css']
})
export class ClientReceptsComponent {

  public recepts: any;

  constructor(public accountService: AccountService, public modalService: ModalService) {
    accountService.getReceptsOfClient().subscribe({
      next: (data => {
        this.recepts = data;
        console.log("Recepts", this.recepts);
      })
    })
  }

}
