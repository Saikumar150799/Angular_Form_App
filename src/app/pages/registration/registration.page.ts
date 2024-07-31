import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationForm } from 'src/app/interfaces/RegisterForm';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public Form: RegistrationForm = {
    name: '',
    email: '',
  };

  constructor(
    public router: Router,
  ) {

  }

  ngOnInit() {}

  routeToLogIn() {
    this.router.navigate(['/login']);
  }
}
