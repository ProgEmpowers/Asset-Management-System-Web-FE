import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../Models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  // model : LoginRequest;
  model : FormGroup;
  constructor(private authService: AuthService , private cookieService: CookieService , private router: Router){
    this.model = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required, Validators.minLength(6)])
    });

    // {
    //   email:'',
    //   password:''
    // };
  }

  ngOnInit(): void {

  }

  onFormSubmit() : void {
    this.authService.login(this.model.value)
    .subscribe({
      next: (response) => {

        //set auth cookie
        this.cookieService.set('Authorization' , `Bearer ${response.token}`,
        undefined, '/',undefined,true,'Strict');
        //set the user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });
        //redirect back to home
        this.router.navigateByUrl('/');
      }
    });
  }
}
