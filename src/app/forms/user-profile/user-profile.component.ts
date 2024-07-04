import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadComponent } from '../../components/upload/upload.component';
import { Employee } from '../../Models/employee';
import { FormBuilder, FormGroup,AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../Models/user.model';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  

  @ViewChild('uploadComponent') uploadComponent!: UploadComponent;

  user?: User;
  employeeId: string | undefined;

  defaultUrl = "https://localhost:7095/Uploads/Images/Assets/upload.png";
  imgPath: string = "";
  isChanged = false;

  id: any;
  item: any;
  employee: Employee = {};
  editForm!: FormGroup;
  isDirty = false;
  fb = new FormBuilder();
  router: any;

  
 // imgPath: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private authService: AuthService
 
  ) {
    this.item = {};
  }

  ngOnInit(): void {

    this.authService.user()
      .subscribe({
        next:(response) => {
          this.user = response;
        }
      });
      this.user = this.authService.getUser();


   // this.id = this.activatedRoute.snapshot.paramMap.get('id');
   if (this.user?.email) {
    this.loadEmployee(this.user.email);
  }

    this.editForm = this.fb.group({
      customUserId:[''],
      firstName: [''],
      lastName: [''],
      jobPost:[''],
      email: [''],
      phoneNumber: ['', this.phoneNumberValidator],
      address: [''],
      nic:['',this.nicValidator],
      dateofBirth:['',this.dateOfBirthValidator],
    });
  }

  
  
 
  loadEmployee(email: string) {
    this.employeeService.getEmployeeByEmail(email).subscribe((res: Employee) => {
      this.employee = res;
      this.employeeId=res.id;// Store the employee ID
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

  
  

  onFormDirty() {
    this.isDirty = true;
  }

 

  onSave() {
    if (this.editForm.valid && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.editForm.value).subscribe({
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
