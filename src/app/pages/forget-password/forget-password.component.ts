// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from './../../auth/services/auth.service';
// import { Component, inject } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-forget-password',
//   templateUrl: './forget-password.component.html',
//   styleUrl: './forget-password.component.scss'
// })
// export class ForgetPasswordComponent {
//   email!: string;
//   AuthService=inject(AuthService);
//   matSnackbar = inject(MatSnackBar);
//   showEmailSent = false;
//   isSubmitting = false;

//   forgetPassword(){
//     this.isSubmitting = true;
//     this.AuthService.forgotPassword(this.email).subscribe({
//       next:(response)=>{
//         if(response.IsSuccess){
//           this.matSnackbar.open(response.Message, "close",{
//             duration:5000,
//           });
//           this.showEmailSent=true;
//         }
//         else{
//           this.matSnackbar.open(response.Message, "close",{
//             duration:5000,
//           });
//         }
//       },
//       error: (error: HttpErrorResponse)=>{
//         this.matSnackbar.open(error.message, "close",{
//           duration:5000,
//         });
//       },
//       complete:()=>{
//         this.isSubmitting = false;
//       }
//     })
//   }
// }

// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from './../../auth/services/auth.service';
// import { Component, inject } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-forget-password',
//   templateUrl: './forget-password.component.html',
//   styleUrls: ['./forget-password.component.scss']
// })
// export class ForgetPasswordComponent {
//   email!: string;
//   AuthService = inject(AuthService);
//   matSnackbar = inject(MatSnackBar);
//   showEmailSent = false;
//   isSubmitting = false;

//   forgetPassword() {
//     if (!this.email) {
//       this.matSnackbar.open("Please enter a valid email.", "close", {
//         duration: 5000,
//       });
//       return;
//     }

//     this.isSubmitting = true;
//     this.AuthService.forgotPassword(this.email).subscribe({
//       next: (response) => {
//         this.matSnackbar.open(response.Message, "close", {
//           duration: 5000,
//         });
//         if (response.IsSuccess) {
//           this.showEmailSent = true;
//         }
//       },
//       error: (error: HttpErrorResponse) => {
//         this.matSnackbar.open("Failed to send reset password email. Please try again later.", "close", {
//           duration: 5000,
//         });
//       },
//       complete: () => {
//         this.isSubmitting = false;
//       }
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../auth/services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-forget-password',
//   templateUrl: './forget-password.component.html',
//   styleUrls: ['./forget-password.component.scss'] // Add your SCSS file here
// })
// export class ForgetPasswordComponent implements OnInit {
//   forgotPasswordForm: FormGroup;
//   showEmailSent = false;
//   isSubmitting = false;

//   constructor(private fb: FormBuilder,
//               private authService: AuthService,
//               private snackBar: MatSnackBar,
//               private router: Router) {
//     this.forgotPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit() {

//   }

//   forgetPassword() {
//     if (this.forgotPasswordForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     const email = this.forgotPasswordForm.get('email')?.value;

//     this.authService.forgotPassword(email)
//       .subscribe({
//         next: response => {
//           if (response.IsSuccess) {
//             this.showEmailSent = true;
//             this.snackBar.open('successfully sent reset password email', 'Close', {
//               duration: 5000
//             });
//           } else {
//             this.snackBar.open(response.Message, 'Close', {
//               duration: 5000
//             });
//           }
//         },
//         error: error => {
//           this.snackBar.open('Failed to send reset password email. Please try again later.', 'Close', {
//             duration: 5000
//           });
//         },
//         complete: () => {
//           this.isSubmitting = false;
//         }
//       });
//   }
// }






// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../auth/services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-forget-password',
//   templateUrl: './forget-password.component.html',
//   styleUrls: ['./forget-password.component.scss']
// })
// export class ForgetPasswordComponent implements OnInit {
//   forgotPasswordForm: FormGroup;
//   showEmailSent = false;
//   isSubmitting = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private snackBar: MatSnackBar,
//     private router: Router
//   ) {
//     this.forgotPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit() {}

//   forgetPassword() {
//     if (this.forgotPasswordForm.invalid) {
//       return;
//     }

//     this.isSubmitting = true;
//     const email = this.forgotPasswordForm.get('email')?.value;

//     this.authService.forgotPassword(email).subscribe({
//       next: response => {
//         if (response.IsSuccess) {
//           this.showEmailSent = true; // Update view
//           this.snackBar.open('Successfully sent reset password email', 'Close', {
//             duration: 5000
//           });
//         } else {
//           this.snackBar.open('response.Message', 'Close', {
//             duration: 5000
//           });
//         }
//       },
//       error: error => {
//         this.snackBar.open('Failed to send reset password email. Please try again later.', 'Close', {
//           duration: 5000
//         });
//       },
//       complete: () => {
//         this.isSubmitting = false;
//       }
//     });
//   }
// }




// forget-password.component.ts
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
        console.log(response.Message);
        if (response.IsSuccess) {
          this.showEmailSent = true; // Show success message
          this.snackBar.open(response.Message, 'Close', {
            duration: 5000
          });
        } else {
          console.log(response.Message);
          this.showEmailSent = true;
          this.errorMessage = response.Message; // Show error message from backend
          this.snackBar.open(response.Message, 'Close', {
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

