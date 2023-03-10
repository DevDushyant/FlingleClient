import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { map, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndPoints } from '../_common/apiendpoint';
import { PresenceService } from './presence.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient,private presence: PresenceService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + ApiEndPoints.login, model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + ApiEndPoints.register, model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);

        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  // setCurrentUser(user: User) {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.currentUserSource.next(user);

  // }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    }
  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
    }
}
