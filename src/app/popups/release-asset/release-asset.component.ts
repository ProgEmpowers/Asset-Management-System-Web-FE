import { Component } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssetStockService } from '../../services/asset-stock.service';
import { NgToastService } from 'ng-angular-popup';
import { AssetStatusEnum } from '../../Models/AssetStatusEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-release-asset',
  templateUrl: './release-asset.component.html',
  styleUrl: './release-asset.component.scss'
})
export class ReleaseAssetComponent {

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
    console.log("Releasing asset: ", this.selectedAsset.id);
    this.selectedAsset.assetStatus = AssetStatusEnum.Free;
    this.selectedAsset.userId = "";
    this.assetService.updateAsset(this.assetEdit_ID, this.selectedAsset).subscribe({
      next: (res) => {
        this.toast.success({
          summary:"Asset released!",
          detail:"Asset released successfully"
        })
        this.reloadComponent(true);
        console.log(this.selectedAsset)
      }
    })
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
