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

  isTab1 = true;
  isTab2 = false;
  isTab3 = false;

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
    });
  }

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
    this.isDirty = true
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
          detail:"Asset updated successfully",
          summary:"Changes saved!"
        });
        this.isDirty = false;
      },
    });
  }
}
