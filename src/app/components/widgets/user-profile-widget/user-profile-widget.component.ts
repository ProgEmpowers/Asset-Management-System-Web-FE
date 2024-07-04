import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/employee';
import { AuthService } from '../../../auth/services/auth.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-user-profile-widget',
  templateUrl: './user-profile-widget.component.html',
  styleUrl: './user-profile-widget.component.scss'
})
export class UserProfileWidgetComponent implements OnInit {
  user?:Employee;

  constructor(
    private userService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getEmployeeByEmail(this.authService.getUser()!.email).subscribe((res) => {
      this.user = res;
    })
  }
}
