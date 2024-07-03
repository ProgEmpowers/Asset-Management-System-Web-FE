import { Component, HostListener, OnInit, Optional, ViewChild, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import intlTelInput from 'intl-tel-input/intlTelInputWithUtils';

@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrl: './new-vendor.component.scss'
})
export class NewVendorComponent implements OnInit {

  // Properties
  selectedSupplyAssetTypes: string[] = [];
  vendorForm: FormGroup;

  // Constructor
  constructor(
    private vendorService: VendorService,
    private router: Router,
    private toastServ: NgToastService
  ) {

    // Initialize the form
    this.vendorForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      mobileNo: new FormControl("", [Validators.required, Validators.minLength(12)]),
      email: new FormControl("", [Validators.email]),
      supplyAssetTypes: new FormArray([])
    });
  }

  // Initialize the component
  ngOnInit(): void {
    // Supply Asset Types
    this.selectedSupplyAssetTypes = [
      'PC',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Scanner',
      'Other Devices'
    ];

    // Initialize the mobile form control with intlTelInput
    const inputElement = document.querySelector('#vendorMobileNo') as HTMLInputElement;
    if (inputElement) {
      intlTelInput(inputElement, {
        initialCountry: 'lk',
        separateDialCode: false,
        geoIpLookup: (callBack: (arg0: string) => any) => {
          fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(data => callBack(data.country_code))
          .catch(() => callBack("lk"));
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      });
    }
  }

  disableAssetType(value: string): boolean {
    return this.supplyAssetTypesControl.some(control => control.value === value);
  }

  disableAddingAssets(): boolean {
    return this.supplyAssetTypesControl.length == this.selectedSupplyAssetTypes.length;
  }

  // Add Supply Asset Types
  onAddSupplyAsset() {
    const control = new FormControl("");
    (<FormArray>this.vendorForm.get('supplyAssetTypes')).push(control);
    console.log(this.vendorForm.get('supplyAssetTypes'));
  }

  // Remove Supply Asset Types
  onRemoveSupplyAsset(index: number) {
    const control = <FormArray>this.vendorForm.controls['supplyAssetTypes'];
    control.removeAt(index);
  }

  // Get Supply Asset Types
  get supplyAssetTypesControl() {
    return (<FormArray>this.vendorForm.get('supplyAssetTypes')).controls;
  }

  // Clear All Supply Asset Types
  onClearAll() {
    const control = <FormArray>this.vendorForm.controls['supplyAssetTypes'];
    control.clear();
    this.vendorForm.reset();
  }

  // Filter input value
  @HostListener('input', ['$event.target.value'])
  onInputChange(value: string) {
    const filteredValue: string = this.filterValue(value);
  }

  filterValue(value: string): string {
    return value.replace(/[^0-9]*/g, '');
  }

  // Submit Vendor Form
  submit(): void {
    console.log(this.vendorForm.value);
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
          this.onClearAll();
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
        window.location.reload();
      }, err => {
        this.toastServ.error({detail:"Vendor creation failed", summary:"New Vendor is not created.", duration:5000});
      }
    );
  }

  // Reload Component
  reloadComponent(self: boolean, urlNavigator?: string) {
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlNavigator;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {       //skipLocatingChange: true - means 'don't update the url when navigating.'
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`)
      })
    });
  }
}
