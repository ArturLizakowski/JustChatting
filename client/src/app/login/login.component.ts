import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  registerMode = false;

  model: any = {}
  loggedIn: boolean;
  standardLoginIsWorking = false;
  formWasValidated = false;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
    //console.log(this.model)
  }

  logout() {
    this.userService.logout();
  }
  
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  
}
