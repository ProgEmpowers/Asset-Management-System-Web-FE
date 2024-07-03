import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetStockService } from '../../services/asset-stock.service';
import { NgToastService } from 'ng-angular-popup';
import { Vendor } from '../../Models/vendor';
import { ContractService } from '../../services/contract.service';
import { Contract } from '../../Models/contract';
import { map } from 'rxjs';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit {
  
  // Properties
  id: any;
  prevAssetCount: number = 0;

  // Initialize the vendor object
  vendor: Vendor = {
    id: '',
    name: '',
    address: '',
    mobileNo: '',
    email: '',
    supplyAssetTypes: [],
    isActive: false
  };

  // Initialize the contracts and vendors
  allContracts: Contract[] = [];
  contractsMade: Contract[] = [];
  vendors: Vendor[] = [];
  selectedSupplyAssetTypes: string[] = [];

  // Initialize the form
  vendorEditForm!: FormGroup;
  fb = new FormBuilder();
  isDirty = false;

  // Initialize the tabs
  isTab1 = true;
  isTab2 = false;
  isTab3 = false;

  // Constructor
  constructor(
    private activatedRoute: ActivatedRoute,
    private vendorService: VendorService,
    private contractServ: ContractService,
    private toast: NgToastService,
    private router: Router
  ) {
    this.getAllVendors();
  }

  // Initialize the component
  ngOnInit(): void {
    // Get the id from the route
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadVendor(this.id);
    this.getContracts();

    this.selectedSupplyAssetTypes = [
      'PC',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Scanner',
      'Other Devices'
    ];

    this.vendorEditForm = new FormGroup({
      name: new FormControl(this.vendor.name),
      address: new FormControl(this.vendor.address),
      mobileNo: new FormControl(this.vendor.mobileNo, [Validators.minLength(10)]),
      email: new FormControl(this.vendor.email, [Validators.email]),
      supplyAssetTypes: new FormArray([])
    });

    // Initialize intlTelInput for the mobile number input
    const inputElement = document.querySelector('#mobileNo') as HTMLInputElement;
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

  // Get all contracts relevant to the vendor
  getContracts(): void {
    this.contractServ.getAllContracts().subscribe(
      (list: Contract[]) => {
        this.allContracts = list ?? [];
        this.splitDateTime(this.allContracts);
        this.contractsMade = this.allContracts.filter(contract => contract.idOfVendors.includes(Number(this.vendor.id)));
        const isIdInContracts = this.isIdInVendorIds(this.allContracts, this.vendor.id);
        console.log(`Is ${this.vendor.id} present in contracts:`, isIdInContracts);
      }
    );
  }

  // Split date and time
  splitDateTime(contracts: Contract[]): void {
    contracts.forEach(contract => {
      if (contract.assignedDate) {
        const dateTimeParts = contract.assignedDate.split('T');
        contract.assignedDate = dateTimeParts[0];
        contract.time = dateTimeParts[1].split('.')[0];
      }
    });
  }

  // Check if the id is in the vendor ids
  isIdInVendorIds(contracts: Contract[], specificId: any): boolean {
    return contracts.some(contract => contract.idOfVendors.includes(specificId));
  }

  // Get all vendors
  getAllVendors(): void {
    this.vendorService.getVendorList().subscribe((list) => {
      this.vendors = list ?? [];
    });
  }

  // Load the vendor by id
  loadVendor(id: any): void {
    this.vendorService.getVendorById(id).subscribe((result: Vendor) => {
      this.vendor = result;
      this.initializeFormValues();
    });
  }

  // Initialize the form values
  initializeFormValues(): void {
    this.vendorEditForm.patchValue({
      name: this.vendor.name,
      address: this.vendor.address,
      mobileNo: this.vendor.mobileNo,
      email: this.vendor.email
    });

    this.setSupplyAssetTypes(this.vendor.supplyAssetTypes);
    this.prevAssetCount = this.selectedSupplyAssetTypes.length;
    console.log('Previous Asset Count:', this.prevAssetCount);
  }

  // Set supply asset types
  setSupplyAssetTypes(assetTypes: string[]): void {
    const assetTypesFormArray = this.vendorEditForm.get('supplyAssetTypes') as FormArray;
    assetTypes.forEach(type => {
      assetTypesFormArray.push(this.fb.control(type));
    });
  }

  // Update the vendor
  onUpdateVendor(): void {
    
    this.vendorService.updateVendor(this.vendor.id, this.vendorEditForm.value).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Vendor updated successfully',
          summary: 'Changes saved!',
        });
        this.isDirty = false;
      },
      error: (err) => {
        this.toast.error({
          detail: 'Vendor update failed',
          summary: 'Error occurred!',
        });
      }
    });
  }

  navigateTo(id: string) {
    this.vendorService.sendData(id);
    this.router.navigate(['vendors', id]);
  }


  // Delete the vendor
  getVendorName(id: any): string {
    const vendor = this.vendors.find(v => v.id === id);
    return vendor ? vendor.name : '';
  }

  // Change the view class of the vendor
  changeViewClassOfVendor(id: any): string {
    const vendor = this.vendors.find(v => v.id === id);
    return vendor && !vendor.isActive ? 'removed' : '';
  }

  // Hide the vendor
  hideThisVendor(id: any): boolean {
    return this.vendor.id === id;
  }

  // Disable the asset type
  disableAssetType(type: string): boolean {
    return this.supplyAssetTypesControl.some(control => control.value === type);
  }

  // Disable adding assets
  disableAddingAssets(): boolean {
    return this.supplyAssetTypesControl.length === this.selectedSupplyAssetTypes.length;
  }

  // Add supply asset
  onAddSupplyAsset(): void {
    (this.vendorEditForm.get('supplyAssetTypes') as FormArray).push(this.fb.control(''));
  }

  // Remove supply asset
  onRemoveSupplyAsset(index: number): void {
    (this.vendorEditForm.get('supplyAssetTypes') as FormArray).removeAt(index);
    this.onFormDirty();
  }

  // Get supply asset types
  get supplyAssetTypesControl() {
    this.enteredPreviousValue();
    return (this.vendorEditForm.get('supplyAssetTypes') as FormArray).controls;
  }

  // Get the previous value of the supply asset types
  enteredPreviousValue() {
    return (this.vendorEditForm.get('supplyAssetTypes') as FormArray).controls.some(control => control.value === '');
  }

  // Clear all supply asset types
  onClearAll(): void {
    (this.vendorEditForm.get('supplyAssetTypes') as FormArray).clear();
    this.vendorEditForm.reset();
  }

  // Filter the input value
  getAssetName(id: string): string {
    return this.selectedSupplyAssetTypes.find(asset => asset === id) ?? '';
  }

  // Filter the input value
  nullStringRepresent(insert: any): string {
    if (insert === null) {
      return "No Optionals here...";
    }
    return insert;
  }

  // Submit the vendor tabs

  onTab1Click(): void {
    this.isTab1 = true;
    this.isTab2 = false;
    this.isTab3 = false;
  }

  onTab2Click(): void {
    this.isTab1 = false;
    this.isTab2 = true;
    this.isTab3 = false;
  }

  onTab3Click(): void {
    this.isTab1 = false;
    this.isTab2 = false;
    this.isTab3 = true;
  }

  onFormDirty(): void {
    this.isDirty = true;
  }
  
  supplyAssetCountChanged(): void {
    this.isDirty = true;
  }

  isTab1Open(): boolean {
    return this.isTab1;
  }

  isTab2Open(): boolean {
    return this.isTab2;
  }

  isTab3Open(): boolean {
    return this.isTab3;
  }
}
