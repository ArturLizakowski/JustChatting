import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-host',
  templateUrl: './chat-host.component.html',
  styleUrls: ['./chat-host.component.scss'],
})
export class ChatHostComponent {  
  constructor(public userService: UserService, public router: Router) {}

  logout() {
    this.router.navigate(['/login'])
    this.userService.logout();
  }
}
