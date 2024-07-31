import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationForm } from 'src/app/interfaces/RegisterForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public router: Router) {}

  public Form: RegistrationForm = {
    name: '',
    email: '',
  };
  public wrongOTPInput: boolean = false;
  public showOtpCounter: boolean = false;
  public visibleBlock: string = 'email';
  public eventCopy: any;
  public loginData = {
    accessCode1: '',
    accessCode2: '',
    accessCode3: '',
    accessCode4: '',
  };
  ngOnInit() {}

  routeToRegister() {
    this.router.navigate(['/registration']);
  }

  public addOnFocusClass(id: string) {
    document.getElementById(id)?.classList.add('otp-focus-border');
  }

  public removeOnFocusClass(id: string) {
    document.getElementById(id)?.classList.remove('otp-focus-border');
  }

  next(el: any, prev: any, value: any) {
    this.eventCopy = event;
    if (value) {
      console.log('contains');
    } else {
      console.log('empty');
    }

    if (this.eventCopy.key == 'Backspace' && !value) {
      if (prev) {
        prev.setFocus();
      }
    } else if (this.eventCopy.key == 'Backspace' && value) {
    } else {
      el.setFocus();
    }
  }

  sendOtp() {
    this.visibleBlock = 'otp';
  }

  resendOTPCalled() {}

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
