import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationForm } from 'src/app/interfaces/RegisterForm';
import * as emailjs from 'emailjs-com';
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
  public isEmailValid: boolean = false;
  public showOtpCounter: boolean = false;
  public visibleBlock: string = 'email';
  public sendOtpButtonText: string = 'Send OTP';
  public isvalidOTP: boolean = true;
  public otpSent: boolean = false;
  public eventCopy: any;
  public ACTIVE_USER: any = {};
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

  validateEmail() {
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    if (this.Form.email && this.Form.email.trim().match(emailPattern)) {
      this.isEmailValid = false;
    } else {
      this.isEmailValid = true;
    }
  }

  sendOtp() {
    this.sendEmail();
  }

  resendOTPCalled() {}

  async sendEmail() {
    this.sendOtpButtonText = 'Sending...';
    const templateParams = {
      from_name: 'SAIKUMAR',
      to_name: this.Form.name.toUpperCase(),
      to_email: this.Form.email,
      subject: '',
      message:
        'Dear User, 7901 is your OTP for user login. Please do not share your OTP with anyone.',
    };
    return emailjs
      .send('service_r68bnap', 'template_sqal8my', templateParams)
      .then((response) => {
        this.sendOtpButtonText = 'Sent';
        this.visibleBlock = 'otp';
        this.otpSent = true;

        console.log('Email sent successfully', response);
        return response;
      })
      .catch((error) => {
        this.otpSent = false;
        console.error('Error sending email', error);
        throw error;
      });
  }

  Login() {
    const OTP = Object.values(this.loginData).join('');
    console.log('================================', OTP === '7901');
    if (OTP === '7901') {
      window.localStorage.setItem('isLoggedIn', 'true');
      this.isvalidOTP = true;
      this.router.navigate(['/dashboard']);
    } else {
      this.isvalidOTP = false;
    }
    console.log('login', OTP);
  }

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
