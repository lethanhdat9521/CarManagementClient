import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  formD: NgForm = null!;
  constructor(private reCaptchaV3Service: ReCaptchaV3Service) {

  }

  public send(): void {
    if (this.formD.invalid) {
      for (const control of Object.keys(this.formD.controls)) {
        this.formD.controls[control].markAsTouched();
      }
      return;
    }

    this.reCaptchaV3Service.execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
      });
  }
}
