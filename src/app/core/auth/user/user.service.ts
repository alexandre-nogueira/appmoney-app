import { User } from './user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const KEY = 'userData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {
    if (this.isLogged()) {
      this.updateUserSubject(this.getUserData() ?? {});
    }
  }

  private userSubject = new BehaviorSubject<User>({});

  public setUserData(user: User) {
    const userData = JSON.stringify(user);
    localStorage.setItem(KEY, userData);
    this.updateUserSubject(user);
  }

  private updateUserSubject(user: User) {
    this.userSubject.next(user);
  }

  public getUserData() {
    const userData = localStorage.getItem(KEY);
    if (userData) {
      const user = JSON.parse(userData) as User;
      return user;
    }
    return null;
  }

  public getUserToken() {
    const user = this.getUserData();
    if (user) {
      return user.APIToken;
    }
    return null;
  }

  public isLogged() {
    return !!this.getUserToken();
  }

  public logout() {
    localStorage.removeItem(KEY);
    this.updateUserSubject({});
    this.router.navigate(['']);
  }

  public getUserSubjectData() {
    return this.userSubject.asObservable();
  }
}
