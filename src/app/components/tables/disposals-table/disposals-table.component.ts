import { Component, OnInit } from '@angular/core';
import { Asset } from '../../../Models/asset';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DisposalService } from '../../../services/disposal.service';

@Component({
  selector: 'app-disposals-table',
  templateUrl: './disposals-table.component.html',
  styleUrl: './disposals-table.component.scss'
})
export class DisposalsTableComponent implements OnInit{

  assetList?: Asset[];

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

  constructor(
    private disposalService:DisposalService,
    private router: Router,
    private toastr: NgToastService
    ){}

  ngOnInit(): void {
    this.getAllDeleteAssets();
  }

  getAllDeleteAssets() : void {
    this.disposalService.getAllDeleteAssetList()
    .subscribe(
      (list) => {
        this.assetList = list;
      }
    )
  }

  deleteAsset(id:number): void{
    this.disposalService.deleteAsset(id)
    .subscribe(
      (res) => {
        this.toastr.success({detail:"Asset deleted", summary:"Asset is deleted successfully.", duration:5000});
        // this.getAllDeleteAssets();
      }
    )
  }
}
