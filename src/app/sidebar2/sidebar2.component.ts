import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrl: './sidebar2.component.scss'
})
export class Sidebar2Component implements OnInit{
  user?: User;

  constructor (private authService: AuthService){

  }
  ngOnInit(): void {
      this.authService.user()
      .subscribe({
        next:(response) => {
          console.log(response);
          this.user = response;
        }
      });
      this.user = this.authService.getUser();

  }

}
