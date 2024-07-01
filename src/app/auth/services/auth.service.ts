import { AuthResponse } from './../../Models/AuthResponse';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../Models/login-request.model';
import { LoginResponse } from '../../Models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../Models/user.model';
import { ResetPasswordRequest } from '../../Models/ResetPasswordRequest';
import { ChangePasswordRequest } from '../../Models/change-password-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private userKey = 'user';

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http : HttpClient , private cookieService: CookieService) { }

  login(request : LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:5146/apigateway/Auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void {
    this.$user.next(user);

    localStorage.setItem('user-email' , user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles){
      const user: User = {
        email: email,
        roles: roles.split(',')
      }
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/')
    this.$user.next(undefined);
  }

  apiUrl = 'https://localhost:7229/api/Auth';
  forgotPassword = (email:string):Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}/forgot-password`,{email,});


  resetPassword = (data:ResetPasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}/reset-password`, data);

  changePassword = (data:ChangePasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}/change-password`, data);

  // refreshToken = (data: {
  //   email: string;
  //   token: string;
  //   refreshToken: string;
  // }): Observable<AuthResponse> =>
  //   this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, data);
}
