import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-widget',
  templateUrl: './employee-widget.component.html',
  styleUrl: './employee-widget.component.scss'
})
export class EmployeeWidgetComponent implements OnInit  {
  total: number=0;
  admin: number = 0;
  vManager: number = 0;
  aManager: number = 0;
  nUser:number=0;


  ngOnInit(): void {

    this.employeeService.getEmployeeList()
    .subscribe(
      (list) => {
        this.total = list.length;
      }
    )

    this.employeeService.getUserCountInRole("admin").subscribe(res => {
      this.admin = res;
    });
    this.employeeService.getUserCountInRole("VendorManeger").subscribe(res => {
      this.vManager = res;
    });
    this.employeeService.getUserCountInRole("AssetManeger").subscribe(res => {
      this.aManager = res;
    });
    this.employeeService.getUserCountInRole("NormalUser").subscribe(res => {
      this.nUser = res;
    });


  }

  /**
   *
   */
  constructor(private employeeService: EmployeeService) {}
 

}
