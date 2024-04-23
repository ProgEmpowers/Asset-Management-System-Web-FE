import { Component, OnInit } from '@angular/core';
import { Asset } from '../Models/asset';
import { AssetStockService } from '../services/asset-stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  assetList: Asset[] = [];

  constructor(private assetService: AssetStockService){
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
