import { Message } from '../models/message';
import { Router } from '@angular/router';
import { ok } from 'assert';
import { AddMessageDto } from '../models/add-message-dto';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService, NbChatModule } from '@nebular/theme';
import { Friend } from '../models/friend-request';


@Component({
  selector: 'app-chat-messenger',
  templateUrl: './chat-messenger.component.html',
  providers: [],
  styles: [
    `
      ::ng-deep nb-layout-column {
        justify-content: center;
        display: flex;
      }
      nb-chat {
        width: 1650px;
        height: 1000px;
      }
    `,
  ],
})
export class ChatMessengerComponent implements OnInit {
  
  public messages: Message[];
  public friend: Friend;

  model: AddMessageDto = {
    content: " ",
    modify: " "
  };

  @Input() public set friendInput(v: Friend) {
    this.friend = v;
    //// TUTAJ MOŻESZ OBSŁUŻYĆ ZAŁADOWANIE WIADOMOŚCI JAK INNY PRZYJACIEL ZOSTANIE WYBRANY
  }


  constructor(
    public messageService: MessageService,
    private router: Router,
    public userService: UserService,
    private notification: NbToastrService
  ) {}

  ngOnInit() {
    this.getRecentMessages();
  }

  add() {
    this.messageService.add(this.model).subscribe(
      () => {
        this.getRecentMessages();
        this.messageService.getRecentMessages();
        this.model.content = ("Message[]");
        this.notification.success("Sended");
      },
      error => {
        this.notification.danger("Something wrong");
      }
    );
  }
  
  getRecentMessages() {
    this.messageService.getRecentMessages().subscribe(
      message => {
        this.messages = message;
      },
      error => {}
    );
  }

}
