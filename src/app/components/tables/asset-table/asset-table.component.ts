import { Component, OnInit, Query } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable, skip, take } from 'rxjs';
import { AssetStockService } from '../../../services/asset-stock.service';
import { Asset } from '../../../Models/asset';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.scss'
})
export class AssetTableComponent implements OnInit{

  // public assets: Observable<DataStateChangeEventArgs>;
  assetList?: Asset[];

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

  constructor(private assetService:AssetStockService){
    // this.assets = assetService;

  }

  ngOnInit(): void {
    // const state:any = { skip: 0, take: 6};
    // this.assetService.execute(state);
    // console.log(this.assets);
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

}
