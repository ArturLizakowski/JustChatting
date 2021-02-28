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
        width: 1350px;
        height: 1000px;
      }
    `,
  ],
})
export class ChatMessengerComponent implements OnInit {
  public messages: Message[];
  public friend: Friend;

  @Input() public set friendInput(v: Friend) {
    this.friend = v;
    this.getRecentMessages();
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

  add($event: { message: string; files: any[] }) {
    console.log($event);
    this.messageService
      .addMessage({ content: $event.message, recipientId: this.friend.id })
      .subscribe(
        () => {
          this.getRecentMessages();
          this.notification.success('Sended');
        },
        (error) => {
          this.notification.danger('Something wrong');
        }
      );
  }

  getRecentMessages() {
    this.messageService.getRecentMessages(this.friend.id).subscribe(
      (currentMessage) => {
        this.messages = currentMessage;
      },
      (error) => {}
    );
  }
}
