import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../../Models/asset';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { AssetStockService } from '../../../services/asset-stock.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DeleteRecordService } from '../../../services/delete-record.service';
import { SharedAssetsService } from '../../../services/shared-assets.service';
import { AssetStatusEnum } from '../../../Models/AssetStatusEnum';
import { AssignAssetEmployeeSideService } from '../../../services/assign-asset-employee-side.service';

@Component({
  selector: 'app-employee-asset-table',
  templateUrl: './employee-asset-table.component.html',
  styleUrl: './employee-asset-table.component.scss'
})
export class EmployeeAssetTableComponent implements OnInit {

  @Input() employeeEmail!: string;
  assetList?: Asset[];

  
  public pageSetting: PageSettingsModel = {
    pageSize: 6,
  };

  constructor(private assetService: AssetStockService,
    private router: Router,
    private assignAssetEmployeeSideService:  AssignAssetEmployeeSideService ,
    private toastr: NgToastService,
    private deleteService: DeleteRecordService,
    private sharedAssetService: SharedAssetsService){

  }

  ngOnInit(): void {
    this.getAssetsByEmployeeEmail();
  }

  getAllAssets(): void {
    this.assetService.getAssetList().subscribe((list) => {
      this.assetList = list;
    });
  }

  getAssetsByEmployeeEmail():void{
    this.assignAssetEmployeeSideService.getAssetsByUserEmail(this.employeeEmail).subscribe((list) => {
      this.assetList = list;
    });
  }

  

  sendData(asset: Asset) {
    this.sharedAssetService.sendData(asset);
    this.navigateTo(asset.id!, asset.assetStatus!);
  }
  navigateTo(id: string, status: AssetStatusEnum) {
    if (status == 5) {
      this.router.navigate(['disposals', id]);
      return;
    }
    this.router.navigate(['assets', id]);
  }


}
