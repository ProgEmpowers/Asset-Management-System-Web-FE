import { Component, OnInit } from '@angular/core';
import { Asset } from '../Models/asset';
import { AssetStockService } from '../services/asset-stock.service';
import { Vendor } from '../Models/vendor';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  assetList: Asset[] = [];
  vendorList: Vendor[] = [];

  constructor(private assetService: AssetStockService, private vendorService: VendorService){
  }

  ngOnInit(): void {
    this.getAssets();
    this.getVendors();
  }

  getAssets() : void {
    this.assetService.getAssetList()
    .subscribe(
      (list) => {
        this.assetList = list;
      }
    )
  }

  getVendors(): void {
    this.vendorService.getAllVendors()
    .subscribe(
      (list) => {
        this.vendorList = list;
      }
    )
  }

}
