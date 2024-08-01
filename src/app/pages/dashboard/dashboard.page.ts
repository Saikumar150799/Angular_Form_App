import {
  ChangeDetectorRef,
  Component,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddFormComponent } from 'src/app/components/add-form/add-form.component';

interface User {
  name?: string;
  email?: string;
  amount?: string;
  phoneNumber?: string;
  gender?: string;
  id?: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('popover') popover: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalService: ModalController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  public profilePicture: string = '';
  public filteredUsers: User[] = [];
  public showLoading: boolean = false;
  public ACTIVE_USER: any = {
    gender:'male',
  } ;
  ngOnInit() {
    let activeUserData = window.localStorage.getItem('ACTIVE_USER');

    if (activeUserData) {
      try {
          activeUserData = Object.assign(this.ACTIVE_USER, activeUserData);
      } catch (error) {
          console.error('Failed to parse JSON:', error);
          activeUserData = Object.assign(this.ACTIVE_USER, activeUserData);; // Fallback to an empty object
      }
  } else {
    activeUserData = Object.assign(this.ACTIVE_USER, activeUserData)
  }
  console.log("Active user", activeUserData);
    // this.ACTIVE_USER =  Object.assign(this.ACTIVE_USER, user);

  }

  ionViewDidEnter() {
    this.getData();
  }
  public users: User[] = [];
  public searchText: string = '';
  public getData() {
    this.showLoading = true;
    const data = localStorage.getItem('DATA');
    if (data) {
      setTimeout(() => {
        this.users = JSON.parse(data);
        this.filteredUsers = this.users;
        this.showLoading = false;
      },1000)
    } else {
      setTimeout(() => {

        this.users = [];
        this.showLoading = false;
      },1000)
    }
    this.changeDetectorRef.detectChanges();
  }

  async presentActionSheet(user: User) {
    console.log('caa');
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      mode: 'md',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          role: 'destructive',
          handler: () => {
            this.edit(user);
          },
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          handler: () => {
            this.delete(user);
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

  public async edit(user: User) {
    const modal = await this.modalService.create({
      component: AddFormComponent,
      componentProps: {
        user: user
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (data === 'success') {
      this.users = [];
      this.getData();
    }
  }

  public delete(user: User) {
    const userList = JSON.parse(window.localStorage.getItem('DATA') || '');
    const filterUsers = userList.filter((data: any) => data.id !== user.id);
    localStorage.setItem('DATA', JSON.stringify(filterUsers));
    this.users = [];
    this.getData();
  }

  public async addList() {
    const modal = await this.modalService.create({
      component: AddFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (data === 'success') {
      this.users = [];
      this.getData();
    }
  }

  handleSearch() {
    this.filteredUsers = !this.searchText
      ? this.users
      : this.users.filter((user) =>
          user.name
            ?.toLocaleLowerCase()
            ?.includes(this.searchText.toLocaleLowerCase())
        );
  }
}
