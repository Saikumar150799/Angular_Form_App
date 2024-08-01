import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationForm } from 'src/app/interfaces/RegisterForm';
// import { SMTPClient } from 'emailjs';
import * as emailjs from 'emailjs-com';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public Form: RegistrationForm = {
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
  };

  public isEmailValid: boolean = false;
  public registerButtonText: string = 'Register';
  public registerComplete: boolean = false;

  constructor(public router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  routeToLogIn() {
    this.router.navigate(['/login']);
  }

  validateEmail() {
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    if (this.Form.email && this.Form.email.trim().match(emailPattern)) {
      this.isEmailValid = false;
    } else {
      this.isEmailValid = true;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Registration Successful!',
      message: 'You can now try logging in',
      duration: 5000,
      position: 'top',
      icon: 'checkmark-circle-outline',
      cssClass: 'toast-success',
      color: 'secondary',
    });

    await toast.present();
  }

  async register() {
    this.registerButtonText = 'Registering...';
    const ACTIVE_USER = {
      name: this.Form.name.toUpperCase(),
      email: this.Form.email,
      phoneNumber: this.Form.phoneNumber,
      gender: this.Form.gender
    };
    window.localStorage.setItem('ACTIVE_USER', JSON.stringify(ACTIVE_USER));
    setTimeout(() => {
      this.registerButtonText = 'Registerd successfully';
      this.registerComplete = true;
      const emptyForm = {
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
      };
      this.presentToast()
      this.Form = Object.assign(this.Form, emptyForm);
    }, 3000);
  }
}
