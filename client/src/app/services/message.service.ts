import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMessageDto } from '../models/add-message-dto';
import { Message } from '../models/message';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {


  constructor(private httpClient: HttpClient, public userService: UserService) { }

  public getRecentMessages(): Observable<Message[]> {

    return this.httpClient.get<Message[]>('/messages/getrecent');
  }

  public add(message: AddMessageDto): Observable<void> {
    return this.httpClient.post<void>('/messages/AddMessage', message);
 
  }
}

