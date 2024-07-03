import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { ResetPasswordRequest } from '../../Models/ResetPasswordRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{

  resetPassword = {} as ResetPasswordRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  matSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.resetPassword.email = params["email"];
      this.resetPassword.token = params["token"];
    });
  }

  resetPasswordHandle(){
    this.authService.resetPassword(this.resetPassword).subscribe({
      next:(response) => {
        this.matSnackBar.open(response.message, 'Close',{
          duration:5000,
        });
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.Message, 'Close',{
          duration:5000,
        });
      }
    })
  }

  newPasswordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  toggleNewPasswordVisibility() {
    this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }
}











