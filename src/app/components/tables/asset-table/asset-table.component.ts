import { Component, OnInit, Query } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable, skip, take } from 'rxjs';
import { AssetStockService } from '../../../services/asset-stock.service';
import { Asset } from '../../../Models/asset';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
    private toastr: NgToastService
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

  deleteAsset(id:number): void{
    this.assetService.deleteAsset(id)
    .subscribe(
      (res) => {
        this.toastr.success({detail:"Asset deleted", summary:"Asset is deleted successfully.", duration:5000});
        this.getAssets();
      }
    )
  }

}
