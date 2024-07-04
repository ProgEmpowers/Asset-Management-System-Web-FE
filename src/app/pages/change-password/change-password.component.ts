import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [``]
})
export class ChangePasswordComponent {
  newPassword: string = '';
  currentPassword: string = '';
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  changePassword() {
    const email = this.authService.getUser()?.email;

    if (!email) {
      this.matSnackBar.open('User email not found', 'Close', {
        duration: 3000
      });
      return;
    }

    this.authService.changePassword({
      email: email,
      newPassword: this.newPassword,
      currentPassword: this.currentPassword
    }).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 3000
        });

        if (response.isSuccess) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.matSnackBar.open(err.error.message || 'A network error happens ', 'Close', {
          duration: 3000
        });
      }
    });
  }

  isPasswordValid(password: string): boolean {
    // Define the password regex pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordPattern.test(password);
  }
}
