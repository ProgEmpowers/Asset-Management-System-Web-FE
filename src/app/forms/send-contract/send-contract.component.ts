import { Component, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractService } from '../../services/contract.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../Models/vendor';
import { delay } from 'rxjs';

@Component({
  selector: 'app-send-contract',
  templateUrl: './send-contract.component.html',
  styleUrl: './send-contract.component.scss'
})
export class SendContractComponent implements OnInit {

  // Properties for the component
  orderedSupplyAssetTypes: string[] = [];
  vendorList: Vendor[] = [];
  contractForm: FormGroup;

  // Constructor for the component
  constructor(
    private contractServ: ContractService,
    private vendorServ: VendorService,
    private router: Router,
    private toastServ: NgToastService,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.contractForm = this.fb.group({
      optionals: new FormControl(""),
      orderedAssetTypes: this.fb.array([
        this.newOrderedAssetType()
      ]),
      idOfVendors: this.fb.array([
        this.newIdOfVendor()
      ]),
    }
  );
  this.vendorServ.getAllVendors().subscribe(vendor => {
    this.vendorList = vendor ?? [];
  });
  }

  // Initialize the component
  ngOnInit(): void {
    // Initialize the supply asset types
    this.orderedSupplyAssetTypes = [
      'PC',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Scanner',
      'Laptop'
    ];
    // Initialize the vendor list
    console.log('Supply Asset Types:', this.orderedSupplyAssetTypes);
    
  }

  // Disable asset type
  disableAssetType(value: string): boolean {
    const selectedAssets = this.orderedAssetTypes().controls.map(control => control.get('orderedAsset')?.value);
    return selectedAssets.includes(value);
  }

  // Disable adding assets
  disableAddingAssets(): boolean {
    return this.orderedAssetTypes().controls.length == this.orderedSupplyAssetTypes.length;
  }

  // Check if all assets are selected
  allAssetsSelected(): boolean {
    const selectedAssets = this.orderedAssetTypes().controls.map(control => control.get('orderedAsset')?.value);
    return this.orderedSupplyAssetTypes.every(asset => selectedAssets.includes(asset));
  }

  // Get ordered asset types from the form
  orderedAssetTypes(): FormArray {
    return this.contractForm.get('orderedAssetTypes') as FormArray;
  }

  // New ordered asset type
  newOrderedAssetType(): FormGroup {
    return new FormGroup({
      orderedAsset: new FormControl("", Validators.required),
      quantity: new FormControl("", Validators.required)
    });
  }

  // Add ordered asset
  onAddOrderedAsset() {
    this.orderedAssetTypes().push(this.newOrderedAssetType());
    
    console.log(this.orderedAssetTypes());
  }

  // Remove ordered asset
  onRemoveOrderedAsset(index: number) {
    this.orderedAssetTypes().removeAt(index);
  }

  // Disable vendor
  disableAddingVendors(): boolean {
    return this.idOfVendors().controls.length == this.vendorList.length;
  }

  // Disable vendor
  disableVendor(value: string): boolean {
    return this.idOfVendors().controls.some(control => control.value == value);
  }

  // Check if all vendors are selected
  allVendorsSelected(): boolean {
    const selectedVendors = this.idOfVendors().controls.map(control => control.value);
    return this.vendorList.every(vendor => selectedVendors.includes(vendor.id));
  }

  // Get id of vendors from the form
  idOfVendors(): FormArray {
    return this.contractForm.get('idOfVendors') as FormArray;
  }

  // New id of vendor
  newIdOfVendor(): FormControl {
    return new FormControl("", Validators.required);
  }

  // Add vendor
  onAddVendor() {
    this.idOfVendors().push(this.newIdOfVendor());

    console.log(this.contractForm.get('idOfVendors'));
  }

  // Remove vendor
  onRemoveVendor(index: number) {
    this.idOfVendors().removeAt(index);
  }

  // Clear all the form arrays
  onClearAll() {
    this.orderedAssetTypes().clear();
    this.idOfVendors().clear();
    this.onAddOrderedAsset();
    this.onAddVendor();
  }

  // Submit the form
  submit(): void {
    console.log(this.contractForm.value);

    if (this.contractForm.valid == false) {
      return;
    }
    this.contractServ.createContract(this.contractForm.value).subscribe(
      (data) => {
        if (data) {
          this.toastServ.success({ detail: "Contract sent successfully", summary: "Contract has been sent to the relevent vendors successfully.", duration: 5000 });
          
          console.log(data);
        } else {
          this.toastServ.error({ detail: "Sending contract failed", summary: "Contract has not been sent due to an internal error. Please try again later.", duration: 5000 });

          console.log("Bad request: ");
        }
        this.onClearAll();
        this.contractForm.reset();
        this.reloadComponent(true);
      }, err => {
        this.toastServ.error({detail:"Contract creation failed", summary:"New Contract is not created.", duration:5000});
      }
    )
  }

  // Reload the component
  reloadComponent(self: boolean, urlNavigator?: string) {
    console.log("Current route I am on: ", this.router.url);
    const url = self ? this.router.url : urlNavigator;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {   //skipLocatingChange: true - means 'don't update the url when navigating.'
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`)
      })
    })
  }

  putSpecificCharacter(id: number, array: any[]): string {
    return id !== array.length - 1 ? ', ' : '';
  }

  getVendorName(id: string): string {
    return this.vendorList.find(vendor => vendor.id == id)?.name ?? '';
  }

}
