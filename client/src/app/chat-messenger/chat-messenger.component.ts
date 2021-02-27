<<<<<<< HEAD
import { Message } from '../models/message';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService, NbChatModule} from '@nebular/theme';
import { ok } from 'assert';
import { AddMessageDto } from '../models/add-message-dto';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';


=======
import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService, NbChatModule } from '@nebular/theme';
import { Friend } from '../models/friend-request';
>>>>>>> 91ec6fdf919281781614d5b704b3d19ccd52e489

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
  public friend: Friend;

<<<<<<< HEAD
  model: AddMessageDto = {
    content: ""
  };

  public messages: Message[];

  constructor(
    private messageService: MessageService,
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
        this.model.content = "";
        this.notification.success("Wiadomość dodana poprawnie!");
      },
      error => {
        this.notification.danger("Coś poszło nie tak");
      }
    );
  }
  
  getRecentMessages() {
    this.messageService.getRecentMessages().subscribe(
      toCoZwraca => {
        this.messages = toCoZwraca;
      },
      error => {}
    );
  }
=======
  @Input() public set friendInput(v: Friend) {
    this.friend = v;
    //// TUTAJ MOŻESZ OBSŁUŻYĆ ZAŁADOWANIE WIADOMOŚCI JAK INNY PRZYJACIEL ZOSTANIE WYBRANY
  }

  constructor() {}

  ngOnInit(): void {}
>>>>>>> 91ec6fdf919281781614d5b704b3d19ccd52e489
}
