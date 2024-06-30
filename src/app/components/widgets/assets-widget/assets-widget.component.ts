import { Component, OnInit, Input } from '@angular/core';
import { AssetStockService } from '../../../services/asset-stock.service';
import { AssetStatusEnum } from '../../../Models/AssetStatusEnum';

@Component({
  selector: 'app-assets-widget',
  templateUrl: './assets-widget.component.html',
  styleUrl: './assets-widget.component.scss',
})
export class AssetsWidgetComponent implements OnInit {
  total: number = 0;
  available: number = 0;
  inUse: number = 0;

  constructor(private assetService: AssetStockService) {}

  ngOnInit(): void {
    this.assetService.GetTotalNoOfAsset().subscribe(res => {
      this.total = res;
    });

    this.assetService.GetNoOfAssetByStatus(AssetStatusEnum.Free).subscribe( res => {
      this.available = res;
    });

    this.assetService.GetNoOfAssetByStatus(AssetStatusEnum.Acquired).subscribe( res => {
      this.inUse = res;
    });
  }
}
