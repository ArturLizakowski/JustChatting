import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { UserRegister } from 'src/app/models/user-register';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('form') formRef: NgForm;

  working = false;
  forceShowError = false;
  model: UserRegister = {
    email: 'test@wp.pl',
    displayName: 'Test',
    password: 'Test1234',
    repeatPassword: 'Test1234',
  };
  registerFrom: FormGroup;

  constructor(
    private notificationService: NbToastrService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeFrom
  }
  
  initializeFrom(){
    this.registerFrom = new FormGroup({
      email: new FormControl(),
      displayName: new FormControl(),
      password: new FormControl(),
      repeatPassword: new FormControl()
    })
  }
  register() {
    this.working = true;
    this.userService.register(this.model).subscribe(
      () => {
        this.notificationService.success('Your account was registered successfully. You can now login.');
        this.router.navigateByUrl('/login');
      },
      () => {        
        this.notificationService.danger('Something went wrong, but we dont have proper error handling so please see in developer tools what was the exact error.');
        this.working = false;
      }
    );
  }
}
