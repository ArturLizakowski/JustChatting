import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRegister } from 'src/models/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('form') formRef: NgForm;

  working = false;
  model: UserRegister = {
    email: '',
    nick: '',
    password: '',
    repeatPassword: '',
  };

  constructor() {}

  ngOnInit(): void {}

  register() {
    if (this.formRef.invalid) {
      return;
    }

    this.working = true;
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
  }
}
