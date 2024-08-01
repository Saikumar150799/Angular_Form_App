import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public ACTIVE_USER:any  = {}
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  this.ACTIVE_USER = JSON.parse(JSON.parse(JSON.stringify(window.localStorage.getItem('ACTIVE_USER'))));
  }

  logOut() {
    window.localStorage.clear();
    this._router.navigate(['/registration']);
  }

}
