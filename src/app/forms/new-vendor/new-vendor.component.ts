import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadComponent } from '../../components/upload/upload.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrl: './new-vendor.component.scss'
})
export class NewVendorComponent implements OnInit {

  // @ViewChild('uploadComponent') uploadComponent!: UploadComponent;

  // defaultUrl = "https://localhost:7095/Uploads/Images/Vendors/upload.png";
  // imagePath: string;
  // isChanged = false;

  supplyAssetTypes: string[] = [];

  vendorForm: FormGroup;

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private toastServ: NgToastService
  ) {
    // this.imagePath = this.defaultUrl;
    this.vendorForm = new FormGroup({
      name: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      mobileNo: new FormControl("", Validators.required),
      email: new FormControl("", Validators.email),
      supplyAssetType: new FormControl("")
    })
  }

  ngOnInit(): void {
    this.supplyAssetTypes = [
      'PC',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Scanner',
      'Multiple Devices'
    ];
  }

  // onUploadFinished(event: any) {
  //   this.imagePath = event;
  //   console.log(this.imagePath);
  //   this.isChanged = true;
  //   this.vendorForm.get("imageUrl")?.setValue(this.imagePath);
  // }

  submit(): void {
    if (this.vendorForm.valid == false) {
      return;
    }
    this.vendorService.createVendor(
      this.vendorForm.value
    ).subscribe(
      (e) => {
        if (e) {
          this.toastServ.success({
            detail: "New Vendor created Successfully.",
            summary: "New vendor is added to the system successfully.",
            duration: 5000
          });
          // this.imagePath = this.defaultUrl;
          // this.isChanged = false;
        } else {
          this.toastServ.error({
            detail: "Failed to add the new vendor.",
            summary: "There is already an existing vendor with the same mobile number and email address. Please, check the details and try again.",
            duration: 5000
          });
          console.log("Bad Request");
        }
        this.vendorForm.reset();
        this.reloadComponent(true);
      }
    );
  }

  //
  reloadComponent(self: boolean, urlNavigator?: string) {
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlNavigator;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {       //skipLocatingChange: true - means 'don't update the url when navigating.'
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`)
      })
    });
  }

  // triggerButtonClick() {
  //   // Programmatically trigger click on the button in childComponent
  //   this.uploadComponent.file.nativeElement.click();
  // }
}
