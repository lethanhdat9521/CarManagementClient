import { Injectable } from '@angular/core';
import { modalType } from '../enums/modalType';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public content: string = "";
  public showPopup: boolean = false;
  public type: modalType = modalType.Success;

  constructor() { }
}
