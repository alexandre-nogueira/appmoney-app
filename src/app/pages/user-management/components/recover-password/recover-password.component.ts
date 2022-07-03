import { debounceTime, Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/auth/user/user';
import { UserService } from 'src/app/core/auth/user/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  rpt!: string;
  user$!: Observable<User>;
  resolved = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.rpt = this.activatedRoute.snapshot.params['rpt'];
    if (this.rpt) {
      this.user$ = this.userService
        .getUserFromRPT(this.rpt)
        .pipe(tap({ error: () => (this.resolved = true) }));
    }
  }
}
