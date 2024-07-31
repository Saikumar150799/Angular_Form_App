import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('popover') popover: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalService: ModalController
  ) {}
  public profilePicture: string = '';
  ngOnInit() {
    this.getData();
  }
  public users: {
    name: '';
    email: '';
    amount: '';
    phoneNumber: '';
    gender: '';
  }[] = [];

  public getData() {
    const data = localStorage.getItem('DATA');
    if (data) {
      this.users = JSON.parse(data);
    } else {
      this.users = [];
      console.log('No data found');
    }
  }

  async presentActionSheet() {
    console.log('caa');
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      mode: 'md',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          role: 'destructive',

          data: {
            action: 'delete',
          },
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close-outline',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  public async addList() {
    const moadl = await this.modalService.create({
      component: AddFormComponent,
    });

    return moadl.present();
  }
}
