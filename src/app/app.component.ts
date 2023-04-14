import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(http: HttpClient, public modalService: ModalService) {
    
  }

  title = 'CarManagementClient';
}

