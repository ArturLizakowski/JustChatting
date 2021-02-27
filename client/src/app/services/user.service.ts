import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/user-login';
import { Friend, FriendRequest } from '../models/friend-request';
import { UserRegister } from '../models/user-register';
import { UserSearch } from '../models/user-search';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(model: UserLogin) {
    return this.httpClient.post<User>('/account/login', model).pipe(
      tap((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: UserRegister) {
    return this.httpClient.post('/account/register', model);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  findUsers(search: string): Observable<UserSearch[]> {
    return this.httpClient.get<UserSearch[]>(`/users/find/${search}`);
  }

  requestFriend(userId: number) {
    return this.httpClient.post(`/friends`, { userId: userId });
  }

  getFriends(){
    return this.httpClient.get<Friend[]>(`/friends`);
  }

  getFriendRequests(){
    return this.httpClient.get<FriendRequest[]>(`/FriendRequests`);
  }

  approveFriendRequest(requestId: number){
    return this.httpClient.put(`/FriendRequests/${requestId}/approve`, {});
  }

  rejectFriendRequest(requestId: number){
    return this.httpClient.put(`/FriendRequests/${requestId}/reject`, {});
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
