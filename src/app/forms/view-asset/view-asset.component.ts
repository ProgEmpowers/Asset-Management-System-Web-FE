import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadComponent } from '../../components/upload/upload.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetStockService } from '../../services/asset-stock.service';
import { NgToastService } from 'ng-angular-popup';
import { AssetStatusEnum } from '../../Models/AssetStatusEnum';
import { SafeUrl } from '@angular/platform-browser';
import { User } from '../../Models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../Models/vendor';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrl: './view-asset.component.scss',
})
export class ViewAssetComponent implements OnInit {
  id: any;
  item: any;
  editForm!: FormGroup;
  fb = new FormBuilder();
  isDirty = false;
  availability = false;
  assetStatus = '';
  statusCode = 0;
  isFree = false;
  vendor?: Vendor;
  assetTypes:string[] = []

  isTab1 = true;
  isTab2 = false;
  isTab3 = false;

  status = {
    class: '',
    text: '',
  };

  url: SafeUrl = '';
  onCodeChange(url: SafeUrl) {
    this.url = url;
  }

  user?: User;
  @ViewChild('repair') repair!: ElementRef;
  @ViewChild('sell') sell!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assetService: AssetStockService,
    private toast: NgToastService,
    private router: Router,
    private authService: AuthService,
    private vendorService: VendorService
  ) {
    this.item = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadAsset(this.id);

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
      assetType: [''],
      assetStatus: [''],
      description: ['', Validators.required],
      imageUrl: [''],
      assetValue: [''],
      userId: [''],
    });

    this.assetService.getAssetTypes().subscribe((res) => {
      this.assetTypes = res;
    })

    this.authService.user().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
      },
    });
    this.user = this.authService.getUser();
  }

  async loadAsset(id: string) {
    try {
      this.item = await this.assetService.GetAssetById(id);
      this.loadForm();
      console.log(this.editForm.value);
      this.vendorService.getVendorById(this.item.vendor).subscribe((res) => {
        this.vendor = res;
        console.log(this.vendor);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // setting up unchanged attributes' values to previous values
  loadForm() {
    Object.keys(this.editForm.controls).forEach((key) => {
      var control = this.editForm.get(key);
      if (!control?.dirty) {
        this.editForm.controls[key].setValue(this.item[key]);
      } else {
        this.isDirty = true;
      }
    });
  }

  // helper for loadAssetFn
  // isAvailable(status: number) {
  //   console.log(status);
  //   switch (status) {
  //     case 0:
  //       this.assetStatus = 'Free';
  //       this.isFree = true;
  //       this.statusCode = 1;
  //       break;
  //     case 1:
  //       this.assetStatus = 'Free';
  //       this.isFree = true;
  //       this.statusCode = 1;
  //       break;
  //     case 2:
  //       this.assetStatus = 'Acquired';
  //       this.statusCode = 2;
  //       break;
  //     case 3:
  //       this.assetStatus = 'Damaged';
  //       this.statusCode = 3;
  //       break;
  //     case 4:
  //       this.assetStatus = 'Maintainence';
  //       this.statusCode = 4;
  //       break;
  //     case 5:
  //       this.assetStatus = 'Disposed';
  //       this.statusCode = 5;
  //       break;
  //   }
  // }

  // setting up the tab menu view

  onTab1Click() {
    this.isTab1 = true;
    this.isTab2 = false;
    this.isTab3 = false;
  }

  onTab2Click() {
    this.isTab1 = false;
    this.isTab2 = true;
    this.isTab3 = false;
  }

  onTab3Click() {
    this.isTab1 = false;
    this.isTab2 = false;
    this.isTab3 = true;
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

  isTab3Open() {
    return this.isTab3;
  }

  onSave() {
    this.loadForm();
    if (this.editForm.valid && this.editForm.dirty) {
      this.assetService.updateAsset(this.id, this.editForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Asset updated successfully',
            summary: 'Changes saved!',
          });
          this.isDirty = false;
          this.reloadComponent(true);
        },
      });
    }
  }

  markAsDrity() {
    const controls = Object.keys(this.editForm.controls);
    controls.forEach((key) => {
      this.editForm.controls[key].markAsDirty();
    });
  }

  // Setting up the checkin button functionality
  onCheckIn() {
    this.assetService.sendData(this.id);
  }

  // Setting up the checkout button functionality
  onCheckOut() {
    this.assetService.sendData(this.id);
  }

  // Setting up the dispose button functionality
  onDispose() {
    this.assetService.sendData(this.id);
  }

  // Setting up the status label
  getStatus(assetStatus: number) {
    switch (assetStatus) {
      case 1:
        this.status.class = 'text-bg-success';
        this.status.text = 'Free';
        return this.status;
      case 2:
        this.status.class = 'text-bg-primary';
        this.status.text = 'Acquired';
        return this.status;
      case 3:
        this.status.class = 'text-bg-danger';
        this.status.text = 'Damaged';
        return this.status;
      case 4:
        this.status.class = 'text-bg-warning';
        this.status.text = 'Maintenance';
        return this.status;
      case 5:
        this.status.class = 'text-bg-secondary';
        this.status.text = 'Disposal';
        return this.status;
      default:
        this.status.class = 'text-bg-success';
        this.status.text = 'Free';
        return this.status;
    }
  }

  onActionSelect(action: string) {
    switch (action) {
      case 'restore':
        this.restoreAsset();
        break;
      case 'repair':
        this.assetService.sendData(this.id);
        this.repair.nativeElement.click();
        break;
      case 'sell':
        this.sell.nativeElement.click();
        break;
    }
  }

  onSell() {
    this.assetService.sendData(this.id);
  }

  onRepair() {
    this.assetService.sendData(this.id);
  }

  restoreAsset() {
    this.item.assetStatus = AssetStatusEnum.Free;
    this.assetService.updateAsset(this.item.id, this.item).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Asset restored',
          summary: 'Asset restored successfully!',
        });
        this.router.navigate(['disposals']);
      },
    });
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log('Current route I am on:', this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }
}
