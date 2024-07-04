import { AuthService } from './../auth/services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../services/employee.service';

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

  employee: Employee = {};

  constructor (private authService: AuthService , private router: Router,private employeeService: EmployeeService){

  }
  ngOnInit(): void {
      this.authService.user()
      .subscribe({
        next:(response) => {
          this.user = response;
        }
      });
      this.user = this.authService.getUser();
      if (this.user?.email) {
        this.loadEmployee(this.user.email);
      }

    

  }

  loadEmployee(email:string){
    this.employeeService.getEmployeeByEmail(email).subscribe((res: Employee) => {
      this.employee = res;
      
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.router.navigate(['/login']);
  }

  onMyAccount():void{
    this.router.navigate(['/user-profile']);
  }

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSideMenu.emit({
      collapsed:this.isCollapsed,
      screenWidth:0
    });
  }
}
