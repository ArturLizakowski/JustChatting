import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbChatModule} from '@nebular/theme';


@Component({
  selector: 'app-chat-messenger',
  templateUrl: './chat-messenger.component.html',
  providers: [ ],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 1650px;
      height: 1000px;
    }
  `],
})

export class ChatMessengerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
