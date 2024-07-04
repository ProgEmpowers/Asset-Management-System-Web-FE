import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
      imageUrl:[''],
      phoneNumber: ['', this.phoneNumberValidator],
      address: [''],
      nic:['', this.nicValidator],
      dateofBirth:['', this.dateOfBirthValidator],
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
      imageUrl:this.employee.imageUrl,
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
    this.editForm.controls["imageUrl"].setValue(this.employee.imageUrl);
    console.log(this.employee);
    console.log(this.editForm.value);
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

  onUploadFinished(filePath: string) {
    console.log("upload");
    this.imgPath = filePath;
    //console.log(this.imgPath);
    
    this.onFormDirty();
    this.employee.imageUrl=this.imgPath;
    console.log("hhhhhhhhhhhhh");
    console.log(this.employee.imageUrl);
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

   // Validator for phone number
   phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumberPattern = /^(0[1-689][0-9]{8}|07[0-9]{8})$/;
    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  // Validator for NIC
  nicValidator(control: AbstractControl): ValidationErrors | null {
    const nicPattern = /^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))$/;
    if (control.value && !nicPattern.test(control.value)) {
      return { invalidNic: true };
    }
    return null;
  }

  // Validator for date of birth
  dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (control.value && !datePattern.test(control.value)) {
      return { invalidDateOfBirth: true };
    }
    return null;
  }
}
