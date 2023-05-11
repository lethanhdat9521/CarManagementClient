import { Component } from '@angular/core';
import { modalType } from 'src/app/enums/modalType';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent {
  public content: String = "";
  public type: modalType = this.modalService.type;
  accountList: any[] = [];
  /**
   *
   */
  constructor(private modalService: ModalService, private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.modalService.showPopup = true;
    this.modalService.content = "Loading"
    this.modalService.type = modalType.Loading
    this.accountService.getClientAccounts()
    .subscribe({
      next: (accounts) =>
      {
        this.accountList = <any>accounts;
        this.modalService.showPopup = true;
        this.modalService.content = "Success"
        this.modalService.type = modalType.Success
        console.log(this.accountList);
      },
      error: (response) =>
      {
        console.log(response);
      }
    })
  }
}
