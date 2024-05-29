import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { Employee } from '../../../Models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DeleteRecordService } from '../../../services/delete-record.service';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {

  employeeList?: Employee[];
  employeeIdToDelete?: string;

  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    private toaster: NgToastService,
    private deleteService: DeleteRecordService
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
  
  //  deleteEmployee(id:string): void{
  //    this.employeeService.deleteEmployee(id)
  //    .subscribe(
  //      (res) => {
  //        this.toaster.success({detail:"Employee deleted", summary:"Asset is deleted successfully.", duration:5000});
  //        this.getAllEmployee();
  //      }
  //    )
  //  }

  deleteEmployee(id: string, type: string): void {
    this.deleteService.sendId(id);
    this.deleteService.sendType(type);

    console.log(type);
  }

 

  public pageSetting:PageSettingsModel = {
    pageSize:7
  }


  

}

