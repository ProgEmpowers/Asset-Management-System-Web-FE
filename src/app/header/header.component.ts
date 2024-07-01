import { AuthService } from './../auth/services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

interface SidemenuToggled {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Output() toggleSideMenu:EventEmitter<SidemenuToggled> = new EventEmitter()

  user?: User;
  isCollapsed = false;

  constructor (private authService: AuthService , private router: Router){

  }
  ngOnInit(): void {
      this.authService.user()
      .subscribe({
        next:(response) => {
          this.user = response;
        }
      });
      this.user = this.authService.getUser();

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.router.navigate(['/login']);
  }

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSideMenu.emit({
      collapsed:this.isCollapsed,
      screenWidth:0
    });
  }
}
