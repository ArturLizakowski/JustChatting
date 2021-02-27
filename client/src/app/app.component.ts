import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  template: `<nb-layout [center]="true">
    <nb-layout-column [start]="true" ><router-outlet></router-outlet></nb-layout-column>
  </nb-layout>`
})

export class AppComponent implements OnInit {
  title = 'JustChatting';
  users: any;

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.userService.setCurrentUser(user);
  }

  getUsers() {
    this.httpClient.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
}
