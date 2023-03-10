import { Component,OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';
import { PresenceService } from './_services/presence.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Flingle';;
  users: any;
  //constructor(private accountService: AccountService) {}
  constructor(private accountService: AccountService, private presence: PresenceService) {}

  ngOnInit() {
   this.setCurrentUser(); 
  }

  // setCurrentUser() {
  //   const user: User = JSON.parse(localStorage.getItem('user'));
  //   this.accountService.setCurrentUser(user);
  // }
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }


}
