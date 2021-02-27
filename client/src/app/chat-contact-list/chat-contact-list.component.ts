import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UserSearch } from '../models/user-search';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat-contact-list',
  templateUrl: './chat-contact-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./chat-contact-list.component.scss'],
})
export class ChatContactListComponent {
  public friendSearch: string;
  options: string[];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput') input;

  constructor(public userService: UserService) {}

  userSearch$: Observable<UserSearch[]>;

  ngOnInit() {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
    this.userSearch$ = of([]);
  }

  onChange() {
    if (!this.friendSearch) {
      this.userSearch$ = of([]);
      return;
    }

    this.userSearch$ = this.userService.findUsers(this.friendSearch);
  }

  onSelectionChange($event) {
    console.log($event);
    //this.filteredOptions$ = this.getFilteredOptions($event);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      delay(20),
      map(filterString => this.filter(filterString)),
    );
  }

  onChange2() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange2($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }
}
