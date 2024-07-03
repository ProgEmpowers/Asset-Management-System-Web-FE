import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { Employee } from '../../../Models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DeleteRecordService } from '../../../services/delete-record.service';
import { SharedEmployeesService } from '../../../services/shared-employees.service';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {

  employeeList?: Employee[];
  deletedEmployeeList?:Employee[];
  employeeIdToDelete?: string;

  filterText: string = '';
  isFilterApplied = false;
  filteredEmployeeList?: Employee[];

  showDeletedTable = false;

  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    private toaster: NgToastService,
    private deleteService: DeleteRecordService,
    private sharedEmployeeService: SharedEmployeesService
  ) {}
    
  

  ngOnInit(): void {
    this.getAllEmployee();
    this.getDeletedEmployee();
  }

  getAllEmployee() : void {
    this.employeeService.getEmployeeListWithRole()
    .subscribe(
      (list) => {
        this.employeeList = list;
        this.filteredEmployeeList = list; // Initialize filtered list
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

  sendData(employee:Employee) {
    this.sharedEmployeeService.sendData(employee);
  }

  applyFilter(): void {
    if (this.filterText.trim()) {
      this.filteredEmployeeList = this.employeeList?.filter(employee => 
        employee.customUserId?.toLowerCase().includes(this.filterText.toLowerCase()) ||
        employee.firstName?.toLowerCase().includes(this.filterText.toLowerCase()) ||
        employee.lastName?.toLowerCase().includes(this.filterText.toLowerCase()) ||
        employee.phoneNumber?.toLowerCase().includes(this.filterText.toLowerCase()) ||
        employee.email?.toLowerCase().includes(this.filterText.toLowerCase()) ||
        employee.address?.toLowerCase().includes(this.filterText.toLowerCase())||
        employee.role?.toLowerCase().includes(this.filterText.toLowerCase())
      );
      console.log("if");
      console.log(this.filteredEmployeeList);
    } else {
      this.filteredEmployeeList = this.employeeList;
    }
  }


  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

  toggleTableVisibility() {
    this.showDeletedTable = !this.showDeletedTable;

  }
  
  getDeletedEmployee() : void {
    this.employeeService.getDeletedEmployees()
    .subscribe(
      (list) => {
        this.deletedEmployeeList = list;
      }
    )
    
  }

}

