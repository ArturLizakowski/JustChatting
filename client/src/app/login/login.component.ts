import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLogin: UserLogin = {
    userName: '',
    password: ''
  }

  constructor() {}

  ngOnInit() {}
}
