import { Component, OnInit } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { Employee } from '../../../Models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {

  employeeList?: Employee[];

  /**
   *
   */
  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    private toaster: NgToastService
  ) {}
    
  

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() : void {
    this.employeeService.getEmployeeList()
    .subscribe(
      (list) => {
        this.employeeList = list;
      }
    )
  }
  
  deleteEmployee(id:string): void{
    this.employeeService.deleteEmployee(id)
    .subscribe(
      (res) => {
        this.toaster.success({detail:"Employee deleted", summary:"Asset is deleted successfully.", duration:5000});
        this.getAllEmployee();
      }
    )
  }

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

}
