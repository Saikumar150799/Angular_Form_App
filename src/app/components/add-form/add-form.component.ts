import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  constructor(private modalService: ModalController) {}

  public FORM = {
    name: '',
    email: '',
    amount: '',
    phoneNumber: '',
    gender: '',
  };

  ngOnInit() {}

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
    data.push(this.FORM);
    console.log("data", data);
    localStorage.setItem("DATA", JSON.stringify(data));

  }
}
