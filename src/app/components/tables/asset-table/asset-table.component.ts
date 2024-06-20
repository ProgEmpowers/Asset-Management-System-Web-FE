import { Component, OnInit, Query } from '@angular/core';
import {
  DataStateChangeEventArgs,
  PageSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { Observable, skip, take } from 'rxjs';
import { AssetStockService } from '../../../services/asset-stock.service';
import { Asset } from '../../../Models/asset';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DeleteRecordService } from '../../../services/delete-record.service';
import { SharedAssetsService } from '../../../services/shared-assets.service';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.scss',
})
export class AssetTableComponent implements OnInit {

  assetList?: Asset[];
  status = {
    class:"",
    text:""
  }


  public pageSetting: PageSettingsModel = {
    pageSize: 6,
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
    this.assetService.getAssetList().subscribe((list) => {
      this.assetList = list;
    });
  }

  deleteAsset(id: string, type: string): void {
    this.deleteService.sendId(id);
    this.deleteService.sendType(type);
  }

  sendData(asset: Asset) {
    this.sharedAssetService.sendData(asset);
  }

  getStatus(assetStatus:number) {
    switch(assetStatus) {
      case 1:
        this.status.class = "text-bg-success";
        this.status.text = "Free";
        return this.status;
      case 2:
        this.status.class = "text-bg-primary";
        this.status.text = "Acquired";
        return this.status;
      case 3:
        this.status.class = "text-bg-danger";
        this.status.text = "Damaged";
        return this.status;
      case 4:
        this.status.class = "text-bg-warning";
        this.status.text = "Maintenance";
        return this.status;
      case 5:
        this.status.class = "text-bg-secondary";
        this.status.text = "Disposal";
        return this.status;
      default:
        this.status.class = "text-bg-success";
        this.status.text = "Free";
        return this.status;
    }
  }
}
