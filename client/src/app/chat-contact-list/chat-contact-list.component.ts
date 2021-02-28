import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Friend, FriendRequest } from '../models/friend-request';
import { UserSearch } from '../models/user-search';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-contact-list',
  templateUrl: './chat-contact-list.component.html',
  styleUrls: ['./chat-contact-list.component.scss'],
})
export class ChatContactListComponent {
  public friendSearch: string;
  public activeFriendId = 0;

  @Output() activeFriendChange = new EventEmitter<Friend>();

  friends: Friend[];
  friendRequests: FriendRequest[];
  userSearch$: BehaviorSubject<UserSearch[]> = new BehaviorSubject<
    UserSearch[]
  >([]);

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.refreshFriends();
    this.refreshFriendsRequests();
  }

  refreshFriendsRequests() {
    this.userService.getFriendRequests().subscribe((x) => {
      this.friendRequests = x;
    });
  }

  refreshFriends() {
    this.userService.getFriends().subscribe((x) => {
      this.friends = x;
    });
  }

  onChange() {
    if (!this.friendSearch) {
      this.userSearch$.next([]);
      return;
    }

    this.userService.findUsers(this.friendSearch).subscribe((x) => {
      this.userSearch$.next(x);
    });
  }

  onSelectionChange($event: UserSearch) {
    this.friendSearch = '';
    if (!$event.id) {
      return;
    }

    this.userService.requestFriend($event.id).subscribe((x) => {
      this.refreshFriendsRequests();
    });
  }

  approveFriend(friendRequest: FriendRequest) {
    this.userService
      .approveFriendRequest(friendRequest.requestId)
      .subscribe((x) => {
        this.refreshFriends();
        this.refreshFriendsRequests();
      });
  }

  selectUserForChatting(friend: Friend) {
    this.router.navigateByUrl('/chatapp/messenger');
    this.activeFriendId = friend.id;
    this.activeFriendChange.emit(friend);
  }

  rejectFriend(friendRequest: FriendRequest) {}
}
