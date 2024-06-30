import { Component } from '@angular/core';
import { Asset } from '../../Models/asset';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AssetStockService } from '../../services/asset-stock.service';
import { AssetStatusEnum } from '../../Models/AssetStatusEnum';

@Component({
  selector: 'app-dispose-asset',
  templateUrl: './dispose-asset.component.html',
  styleUrl: './dispose-asset.component.scss',
})
export class DisposeAssetComponent {
  public assetEdit_ID: string = '';
  selectedAsset!: Asset;

  constructor(
    private assetService: AssetStockService,
    private toast: NgToastService,
    private router: Router
  ) {
    // Getting asset data to the modal
    this.assetService.data$.subscribe((data) => {
      this.assetEdit_ID = data;
      this.assetService.GetAssetById(this.assetEdit_ID).subscribe((asset) => {
        this.selectedAsset = asset;
      });
    });
  }

  onConfirm() {
    this.selectedAsset.assetStatus = AssetStatusEnum.Disposal;
    this.selectedAsset.userId = "";
    this.assetService.updateAsset(this.assetEdit_ID, this.selectedAsset).subscribe({
      next: (res) => {
        this.toast.success({
          detail: "Asset sent to disposal!",
          summary: "Asset sent to disposal successfully!"
        });
        this.router.navigate(["disposals"]);
      },
      error: (err) => {
        this.toast.error(err.message);
      }
    })
    console.log(this.selectedAsset);
  }

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:",this.router.url);
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }
}
