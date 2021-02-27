import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model: UserLogin = {
    email: 'test@wp.pl',
    password: 'Test1234',
  };

  working = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NbToastrService
  ) {}

  ngOnInit() {}

  login() {
    this.working = true;
    this.userService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/chatapp');
        this.notification.success(
          `Hello again ${response.displayName}`,
          'Welcome'
        );
      },
      (error) => {
        this.notification.danger(
          'User name or password is not correct',
          'Error'
        );
        console.log(error);
      }
    );
    //console.log(this.model)
  }
}
