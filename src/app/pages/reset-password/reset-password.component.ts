// import { AuthService } from './../../auth/services/auth.service';
// import { Component, OnInit, inject } from '@angular/core';
// import { ResetPasswordRequest } from '../../Models/ResetPasswordRequest';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrl: './reset-password.component.scss'
// })
// export class ResetPasswordComponent implements OnInit{

//   resetPassword = {} as ResetPasswordRequest;
//   authService = inject(AuthService);
//   router = inject(Router);
//   route = inject(ActivatedRoute);
//   matSnackBar = inject(MatSnackBar);

//   ngOnInit(): void {
//     this.route.queryParams.subscribe((params)=>{
//       this.resetPassword.email = params["email"];
//       this.resetPassword.token = params["token"];
//     });
//   }

//   resetPasswordHandle(){
//     this.authService.resetPassword(this.resetPassword).subscribe({
//       next:(response) => {
//         this.matSnackBar.open(response.message, 'Close',{
//           duration:5000,
//         });
//         this.router.navigate(['/login']);
//       },
//       error: (error: HttpErrorResponse) => {
//         this.matSnackBar.open(error.error.Message, 'Close',{
//           duration:5000,
//         });
//       }
//     })
//   }

//   newPasswordFieldType: string = 'password';
//   confirmPasswordFieldType: string = 'password';

//   toggleNewPasswordVisibility() {
//     this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
//   }

//   toggleConfirmPasswordVisibility() {
//     this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
//   }
// }










import { Component, OnInit, inject } from '@angular/core';
import { ResetPasswordRequest } from '../../Models/ResetPasswordRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword = {} as ResetPasswordRequest;
  newPasswordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.resetPassword.email = params["email"];
      this.resetPassword.token = params["token"];
    });
  }

  resetPasswordHandle() {
    if (!this.isPasswordValid(this.resetPassword.newPassword) || this.resetPassword.newPassword !== this.resetPassword.confirmPassword) {
      // Handle invalid password or mismatch error here
      return;
    }

    this.authService.resetPassword(this.resetPassword).subscribe({
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.Message, 'Close', {
          duration: 5000,
        });
      }
    });
  }

  toggleNewPasswordVisibility() {
    this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  isPasswordValid(password: string): boolean {
    // Regular expression to match password criteria
    const regex = {
      digit: /\d/,
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/
    };

    return password.length >= 6 &&
           regex.digit.test(password) &&
           regex.lowercase.test(password) &&
           regex.uppercase.test(password) &&
           regex.specialChar.test(password);
  }
}

