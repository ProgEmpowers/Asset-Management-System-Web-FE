import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss',
})
export class ViewEmployeeComponent implements OnInit {
  id: any;
  employee: Employee;
  editForm!: FormGroup;
  fb = new FormBuilder();
  isDirty = false;

  isTab1 = true;
  isTab2 = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {
    this.employee = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadEmployee(this.id);

    this.editForm = this.fb.group({
      FirstName: [''],
      LastName: [''],
      Email: [''],
      PhoneNumber: [''],
      address: [''],
      imageUrl: [''],
    });
  }

  loadEmployee(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((res: Employee) => {
      this.employee = res;
      this.loadForm();
    });
  }

  loadForm() {
    Object.keys(this.editForm.controls).forEach((key) => {
      const control = this.editForm.get(key as keyof Employee);
      if (!control?.dirty) {
        this.editForm.controls[key].setValue(this.employee[key as keyof Employee]);
      } else {
        this.isDirty = true;
      }
    });
  }

  onTab1Click() {
    this.isTab1 = true;
    this.isTab2 = false;
  }

  onTab2Click() {
    this.isTab1 = false;
    this.isTab2 = true;
  }

  onFormDirty() {
    this.isDirty = true;
  }

  isTab1Open() {
    return this.isTab1;
  }

  isTab2Open() {
    return this.isTab2;
  }

  onSave() {
    this.loadForm();
    this.employeeService.updateEmployee(this.id, this.editForm.value).subscribe({
      next: (res) => {
        this.toast.success({
          detail: "Employee updated successfully",
          summary: "Changes saved!"
        });
        this.isDirty = false;
      },
    });
  }
}
