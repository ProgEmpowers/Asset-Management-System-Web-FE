import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: FormGroup;
  isSubmitting = false;
  passwordFieldType = 'password';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onFormSubmit(): void {
    if (this.model.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.model.value).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 400 && error.error?.errors) {
          const errorMessages = Object.values(error.error.errors).flat();
          if (errorMessages.includes('Password Incorrect')) {
            this.model.controls['password'].setErrors({ incorrect: 'Password is incorrect.' });
          }
          if (errorMessages.includes('Email Incorrect')) {
            this.model.controls['email'].setErrors({ incorrect: 'Email does not exist.' });
          }
        } else {
          this.model.setErrors({ general: 'Login failed. Please try again.' });
        }
      }
    });
  }
}
