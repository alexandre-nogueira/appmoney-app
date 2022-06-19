import { AuthService } from './../../auth/auth.service';
import { UserService } from './../../auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  faUser = faUserCircle;
  user$ = this.userService.getUserSubjectData();

  ngOnInit(): void {
    this.user$.subscribe(() => {
      this.isLogged = this.userService.isLogged();
    });
  }

  public isMenuCollapsed = true;
  public isLogged = false;

  logout() {
    this.authService.logout();
  }
}
