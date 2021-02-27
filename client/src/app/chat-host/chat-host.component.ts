import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-host',
  templateUrl: './chat-host.component.html',
  styleUrls: ['./chat-host.component.scss']
})
export class ChatHostComponent {

  constructor(public userService: UserService) { }
  

}
