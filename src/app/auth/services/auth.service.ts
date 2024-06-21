import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../Models/login-request.model';
import { LoginResponse } from '../../Models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
