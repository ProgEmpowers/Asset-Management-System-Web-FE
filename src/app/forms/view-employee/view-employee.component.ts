import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/employee';
import { UploadComponent } from '../../components/upload/upload.component';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit {



  @ViewChild('uploadComponent') uploadComponent!: UploadComponent;

  defaultUrl = "https://localhost:7095/Uploads/Images/Assets/upload.png";
  imgPath: string = "";
  isChanged = false;

  id: any;
  item: any;
  employee: Employee = {};
  editForm!: FormGroup;
  isDirty = false;
  fb = new FormBuilder();

  isTab1 = true;
  isTab2 = false;

 // imgPath: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private toast: NgToastService,
 
  ) {
    this.item = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadEmployee(this.id);

    this.editForm = this.fb.group({
      customUserId:[''],
      firstName: [''],
      lastName: [''],
      jobPost:[''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      nic:[''],
      dateofBirth:[''],
    });
  }

  
  
 
  loadEmployee(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((res: Employee) => {
      this.employee = res;
      this.loadForm();
    });
  }

  loadForm() {
    this.editForm.patchValue({
      customUserId:this.employee.customUserId,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      jobPost:this.employee.jobPost,
      phoneNumber: this.employee.phoneNumber,
      address: this.employee.address,
      nic:this.employee.nic,
      dateofBirth:this.employee.dateofBirth,
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
    if (this.editForm.valid) {
      this.employeeService.updateEmployee(this.id, this.editForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: "Employee updated successfully",
            summary: "Changes saved!"
          });
          this.isDirty = false;
        },
        error: (err) => {
          this.toast.error({
            detail: "Error updating employee",
            summary: err.message
          });
        }
      });
    }
  }

  

  // Setting up the checkin button functionality
  onAssignAsset() {
    this.employeeService.sendData(this.id);
    console.log(this.id);
  }


  triggerButtonClick() {
    // Programmatically trigger click on the button in ChildComponent
    this.uploadComponent.file.nativeElement.click();
  }
}
