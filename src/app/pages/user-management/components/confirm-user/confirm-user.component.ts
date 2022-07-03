import { AlertService } from './../../../../shared/components/alert/alert.service';
import { UserService } from 'src/app/core/auth/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss'],
})
export class ConfirmUserComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const confirmUserToken =
      this.activatedRoute.snapshot.params['confirmUserToken'];
    if (confirmUserToken) {
      this.userService.confirmUser(confirmUserToken).subscribe({
        next: () => {
          this.alertService.success('Usuário confirmado');
          this.router.navigate(['/user']);
        },
        error: (error) => {
          this.alertService.danger('Ocorreu um erro');
          console.log(error);
        },
      });
    }
  }
}
