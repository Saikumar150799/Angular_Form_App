import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {

  @Input() user: any;

  constructor(private modalService: ModalController) {}

  public FORM = {
    name: '',
    email: '',
    amount: '',
    phoneNumber: '',
    gender: '',
    id: Math.random().toString(36).substr(2, 9),
  };

  ngOnInit() {
    this.FORM = Object.assign(this.FORM,this.user)
    console.log("Form",this.user)
  }

  closeModal() {
    this.modalService.dismiss();
  }
  handleChange(event: any) {
    console.log('handle', event);
  }
  handleSubmit() {
    const prevData = localStorage.getItem('DATA');

    
    let data = [];
    if (prevData) {
      data = JSON.parse(prevData);
    }
    
    const findUser = data.find((user: any) => user.id == this.FORM.id);
    if(findUser) {
      Object.assign(findUser, this.FORM)
    } else {

      data.push(this.FORM);
    }
    localStorage.setItem('DATA', JSON.stringify(data));
    this.modalService.dismiss('success');
  }
}
