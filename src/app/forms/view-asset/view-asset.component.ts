import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedAssetsService } from '../../services/shared-assets.service';
import { Asset } from '../../Models/asset';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadComponent } from '../../components/upload/upload.component';
import { ActivatedRoute } from '@angular/router';
import { AssetStockService } from '../../services/asset-stock.service';
import { NgToastService } from 'ng-angular-popup';
import { AssetStatusEnum } from '../../Models/AssetStatusEnum';

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

  isTab1 = true;
  isTab2 = false;
  isTab3 = false;

  status = {
    class: '',
    text: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private assetService: AssetStockService,
    private toast: NgToastService
  ) {
    this.item = {};
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadAsset(this.id);

    this.editForm = this.fb.group({
      name: [''],
      id: [''],
      assetType: [''],
      description: [''],
      imageUrl: [''],
      assetValue: [''],
    });
  }

  loadAsset(id: string) {
    this.assetService.GetAssetById(id).subscribe((res) => {
      this.item = res;
      this.isAvailable(this.item.assetStatus);
    });
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
  isAvailable(status: number) {
    console.log(status);
    switch (status) {
      case 0:
        this.assetStatus = 'Free';
        this.isFree = true;
        this.statusCode = 1;
        break;
      case 1:
        this.assetStatus = 'Free';
        this.statusCode = 1;
        break;
      case 2:
        this.assetStatus = 'Acquired';
        this.statusCode = 2;
        break;
      case 3:
        this.assetStatus = 'Damaged';
        this.statusCode = 3;
        break;
      case 4:
        this.assetStatus = 'Maintainence';
        this.statusCode = 4;
        break;
      case 5:
        this.assetStatus = 'Disposed';
        this.statusCode = 5;
        break;
    }
  }

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
    this.assetService.updateAsset(this.id, this.editForm.value).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Asset updated successfully',
          summary: 'Changes saved!',
        });
        this.isDirty = false;
      },
    });
  }

  // Setting up the checkin button functionality
  onCheckIn() {
    this.assetService.sendData(this.id);
    console.log(this.id);
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
}
