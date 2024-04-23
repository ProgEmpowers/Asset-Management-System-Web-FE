import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrl: './edit-vendor.component.scss'
})
export class EditVendorComponent implements OnInit {

  public vendorEdit_ID: number = 0;

  supplyAssetTypes: string[] = [];
  vendorEditForm: FormGroup;
  
  constructor(
    private vendorService: VendorService,
    private router: Router,
    private toastServ: NgToastService
  ) {
    this.vendorEditForm = new FormGroup({
      name: new FormControl(""),
      address: new FormControl(""),
      mobileNo: new FormControl(""),
      email: new FormControl("", Validators.email),
      supplyAssetType: new FormControl("")
    });
    this.vendorService.data$.subscribe(data => {
      this.vendorEdit_ID = data;
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
    ]
  }

  updateRecord(): void {
    if (this.vendorEditForm.valid == false) {
      return;
    }
    this.vendorService.updateVendor(this.vendorEdit_ID, this.vendorEditForm.value).subscribe(
      (data) => {
        if (data) {
          this.toastServ.success({detail:"Vendor is updated successfully.", summary:"Vendor is updated and saved to the system successfully.", duration: 5000});
          this.vendorEditForm.reset();
          this.reloadComponent(true);
        }
      }, err => {
        this.toastServ.error({detail:"Vendor is not updated.", summary:"Vendor is not updated and saved to the system.", duration: 5000});
      }
    )
  }

  reloadComponent(self: boolean, urlNavigator ?: string) {
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlNavigator;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am: ${this.router.url}`)
      })
    })
  }

}
