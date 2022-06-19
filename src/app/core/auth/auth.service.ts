import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user/user';
import { tap } from 'rxjs/operators';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  public authenticate(user: string, password: string) {
    return this.httpClient
      .post(
        `${API}/user/login`,
        { email: user, password: password },
        { observe: 'body' }
      )
      .pipe(
        tap((body) => {
          const user: User = body as User;
          this.userService.setUserData(user);
        })
      );
  }

  public logout() {
    this.httpClient.get(`${API}/user/logout`).subscribe({
      next: () => {
        this.userService.logout();
      },
      error: (err) => console.log(err),
    });
  }

  public recoverPassword(email: string) {
    this.httpClient
      .post(`${API}/user/forgotPassword`, { email: email })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
