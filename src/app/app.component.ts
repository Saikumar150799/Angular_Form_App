import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router) {
    this.initializeApp();
  }



  async initializeApp() {
    emailjs.init('-li_TGdNDDlRmvk-V')
    const isLoggedIn = await window.localStorage.getItem('isLoggedIn');

    this.router.navigate([isLoggedIn ? '/dashboard' : '/registration']);
  }
}
