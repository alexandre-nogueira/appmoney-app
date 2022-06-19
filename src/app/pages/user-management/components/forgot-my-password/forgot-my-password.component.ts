import { AuthService } from './../../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-my-password',
  templateUrl: './forgot-my-password.component.html',
  styleUrls: ['./forgot-my-password.component.scss'],
})
export class ForgotMyPasswordComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user: ['', [Validators.email, Validators.required]],
    });
  }

  recoverPassword(): void {
    this.authService.recoverPassword(this.userForm.get('user')?.value ?? '');
    // console.log('email enviado para', this.userForm.get('user')?.value ?? '');
  }
}
