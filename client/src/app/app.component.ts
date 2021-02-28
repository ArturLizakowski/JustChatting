import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
  title = 'JustChatting';
  users: any;
  //messages: any;

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
    this.httpClient.get('/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }

  /*getRecentMessages() {
    this.httpClient.get('/messages').subscribe(response => {
      this.messages = response;
    }, error => {
      console.log(error);
    })
  }*/
}
