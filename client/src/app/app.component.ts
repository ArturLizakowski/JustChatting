import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JustChatting!';
  users: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.getUsers();
    }

    getUsers() {
      this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    })
  }
}
