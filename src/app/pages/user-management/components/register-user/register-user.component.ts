import { UserService } from 'src/app/core/auth/user/user.service';
import { AlertService } from './../../../../shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { samePasswordValidator } from '../../util/same-password-validator';

@Component({
  selector: 'register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  @Input() token = '';
  newUserForm!: FormGroup;
  familyIdDisabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group(
      {
        email: ['', [Validators.email, Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        password: ['', [Validators.minLength(5), Validators.required]],
        confirmPassword: ['', [Validators.minLength(5), Validators.required]],
      },
      {
        validators: [samePasswordValidator],
      }
    );
  }

  registerUser() {
    this.userService
      .register(
        this.newUserForm.get('email')?.value ?? '',
        this.newUserForm.get('password')?.value ?? '',
        this.newUserForm.get('firstName')?.value ?? '',
        this.newUserForm.get('lastName')?.value ?? '',
        this.token
      )
      .subscribe({
        next: () => {
          this.alertService.success('Usuário registrado com sucesso');
          this.router.navigate(['user']);
        },
        error: (error) => {
          console.log(error);
          this.alertService.danger('Ocorreu um erro');
        },
      });
  }
}
