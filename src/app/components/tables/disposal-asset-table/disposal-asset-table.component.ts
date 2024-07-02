import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AssetStockService } from '../../../services/asset-stock.service';
import { DeleteRecordService } from '../../../services/delete-record.service';
import { SharedAssetsService } from '../../../services/shared-assets.service';
import { DisposalAsset } from '../../../Models/disposalAsset';

@Component({
  selector: 'app-disposal-asset-table',
  templateUrl: './disposal-asset-table.component.html',
  styleUrl: './disposal-asset-table.component.scss',
})
export class DisposalAssetTableComponent {
  assetList?: DisposalAsset[];
  status = {
    class: '',
    text: '',
  };

  constructor(
    private assetService: AssetStockService,
    private router: Router,
    private toastr: NgToastService,
    private deleteService: DeleteRecordService,
    private sharedAssetService: SharedAssetsService
  ) {}

  ngOnInit(): void {
    this.getAssets();
  }

  getAssets(): void {
    this.assetService.GetAssetByStatus(5).subscribe((list) => {
      this.assetList = list;
      console.log(this.assetList);
    });
  }

  deleteAsset(id: string, type: string): void {
    this.deleteService.sendId(id);
    this.deleteService.sendType(type);
  }

  sendData(asset: DisposalAsset) {
    this.sharedAssetService.sendData(asset);
  }

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
