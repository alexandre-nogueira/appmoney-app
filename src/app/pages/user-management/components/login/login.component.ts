import { AlertService } from './../../../../shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  onLogin(): void {
    const user = this.userForm.get('user')?.value ?? '';
    const password = this.userForm.get('password')?.value ?? '';

    this.authService.authenticate(user, password).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.alertService.danger('Usuário ou senha inválidos');
        this.userForm.reset();
        console.log(err);
      },
    });
  }
}
