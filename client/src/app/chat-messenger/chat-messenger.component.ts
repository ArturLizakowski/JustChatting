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
  public friend: Friend;

  @Input() public set friendInput(v: Friend) {
    this.friend = v;
    //// TUTAJ MOŻESZ OBSŁUŻYĆ ZAŁADOWANIE WIADOMOŚCI JAK INNY PRZYJACIEL ZOSTANIE WYBRANY
  }

  constructor() {}

  ngOnInit(): void {}
}
