import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssetStockService } from '../../services/asset-stock.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.scss'
})
export class AssetListComponent implements OnInit{

  public assetList!:Asset[];
  public page = 1;
  public pageSize = 4;

  constructor(private assetService:AssetStockService){

  }
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
}
