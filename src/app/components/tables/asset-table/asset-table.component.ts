import { Component, OnInit, Query } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
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
  styleUrl: './asset-table.component.scss'
})
export class AssetTableComponent implements OnInit{

  assetList?: Asset[];

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

  constructor(
    private assetService:AssetStockService,
    private router: Router,
    private toastr: NgToastService,
    private deleteService: DeleteRecordService,
    private sharedAssetService: SharedAssetsService
    ){}

  ngOnInit(): void {
    this.getAssets();
  }

  getAssets() : void {
    this.assetService.getAssetList()
    .subscribe(
      (list) => {
        this.assetList = list;
      }
    )
  }

  deleteAsset(id:string, type:string): void{
    this.deleteService.sendId(id);
    this.deleteService.sendType(type);
  }

  sendData(asset:Asset) {
    this.sharedAssetService.sendData(asset);
  }

}
