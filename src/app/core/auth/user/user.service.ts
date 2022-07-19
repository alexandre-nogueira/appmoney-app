import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { environment } from 'src/environments/environment';

const KEY = 'userData';
const API = environment.apiURL;
const APP = environment.appURL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {
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
  }

  public getUserSubjectData() {
    return this.userSubject.asObservable();
  }

  public recoverPassword(email: string) {
    return this.httpClient.post(`${API}/user/forgotPassword`, {
      email: email,
      appLinkAdress: `${APP}/user/recoverPassword`,
    });
  }

  public getUserFromRPT(rpt: string) {
    return this.httpClient.post(`${API}/user/getUserFromRPT`, {
      rpt: rpt,
    });
  }

  public changepassword(newPassword: string, rpt: string) {
    if (rpt === '') {
      return this.httpClient.post(`${API}/user/updatePassword`, {
        newPassword: newPassword,
      });
    } else {
      return this.httpClient.post(`${API}/user/resetPassword/${rpt}`, {
        newPassword: newPassword,
      });
    }
  }

  public register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    token: string
  ) {
    return this.httpClient.post(`${API}/user/register`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      token: token,
      appLinkAdress: `${APP}/user/confirm`,
    });
  }

  public confirmUser(confirmUserToken: string) {
    return this.httpClient.get(`${API}/user/confirm/${confirmUserToken}`);
  }
}
