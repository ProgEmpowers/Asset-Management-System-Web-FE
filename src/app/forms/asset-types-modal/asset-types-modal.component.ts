import { Component, OnInit } from '@angular/core';
import { AssetStockService } from '../../services/asset-stock.service';
import { NgToastService } from 'ng-angular-popup';
import { AssetType } from '../../Models/AssetType';

@Component({
  selector: 'app-asset-types-modal',
  templateUrl: './asset-types-modal.component.html',
  styleUrl: './asset-types-modal.component.scss',
})
export class AssetTypesModalComponent implements OnInit {
  assetTypeInput = '';
  assetTypes: string[] = [];
  isEmpty = false;

  constructor(
    private assetService: AssetStockService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.assetService.getAssetTypes().subscribe((res) => {
      this.assetTypes = res;
    });
  }

  onInput() {
    if (this.assetTypeInput.length == 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  onSave() {
    if (this.assetTypeInput.length >= 2) {
      const type = new AssetType(this.assetTypeInput);
      this.assetService.addAssetTypes(type).subscribe({
        next: () => {
          this.toast.success({
            detail: 'Asset type added successfully',
            summary: 'Asset type added!',
          });
          this.assetService.getAssetTypes().subscribe((res) => {
            this.assetTypes = res;
          });
          this.assetTypeInput = "";
        },
        error: () => {
          this.toast.error({
            detail: 'Adding asset type failed',
            summary: 'Something went wrong!',
          });
        },
      });
    }
  }
}
