import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent implements OnInit {

  // Create FormGroup for new asset form
  employeeForm:FormGroup;

  Roles: string[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: NgToastService
  ){
    this.employeeForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {
    this.Roles = [
      'Admin',
      'AssetManeger',
      'VendorManeger',
      'NormalUser'
    ];
  }

  submit() : void {
    if (this.employeeForm.valid == false) {
      return;
    }
    this.employeeService.createEmployee(
      this.employeeForm.value
    ).subscribe(
      (res) => {
        if (res) {
          this.toastr.success({detail:"New employee created", summary:"New employee is created successfully.", duration:5000});
          this.employeeForm.reset();
          this.reloadComponent(true);
        }
      }, err => {
          this.toastr.error({detail:"New employee creation failed", summary:"New Employee is not created." , duration:5000});
        }
    )
  }

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }
}
