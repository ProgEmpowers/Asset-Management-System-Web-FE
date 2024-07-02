import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  showEmailSent = false;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  forgetPassword(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const email = this.forgotPasswordForm.get('email')?.value;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        console.log(response.message);
        if (response.isSuccess) {
          this.showEmailSent = true; // Show success message
          this.snackBar.open(response.message, 'Close', {
            duration: 5000
          });
        } else {
          console.log(response.message);
          this.errorMessage = response.message; // Show error message from backend
          this.snackBar.open(response.message, 'Close', {
            duration: 5000
          });
        }
      },
      error: (error) => {
        this.errorMessage = 'Failed to send reset password email. Please try again later.';
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 5000
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

