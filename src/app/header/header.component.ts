import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public menuItems: MenuItemModel[] = [
    {
      iconCss: 'far fa-bell',

    },
    {
      iconCss: 'far fa-user',
        items: [
            { text: 'My profile' },
            { text: 'Customize' },
            { text: 'Sign out' }
        ]
    }
    //,
    // {
    //   iconCss: 'fas fa-user-plus',
    //   url:"/login"
    // }
  ];

  user?: User;

  constructor (private authService: AuthService , private router: Router){

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

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
