import { AfterViewChecked, Component, OnInit, Query } from '@angular/core';
import {
  DataStateChangeEventArgs,
  PageSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { Observable, filter, skip, take } from 'rxjs';
import { AssetStockService } from '../../../services/asset-stock.service';
import { Asset } from '../../../Models/asset';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DeleteRecordService } from '../../../services/delete-record.service';
import { SharedAssetsService } from '../../../services/shared-assets.service';
import { AssetStatusEnum } from '../../../Models/AssetStatusEnum';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrl: './asset-table.component.scss',
})
export class AssetTableComponent implements OnInit {
  assetList?: Asset[];
  status = {
    class: '',
    text: '',
  };

  filterText: string = '';
  filterStatus: string="";
  filterCategory: string="";
  isFilterApplied = false;
  assetTypes:string[] = [];

  filters = {
    label: '',
    subcategory: '',
  };

  public pageSetting: PageSettingsModel = {
    pageSize: 6,
  };

  constructor(
    private assetService: AssetStockService,
    private router: Router,
    private toastr: NgToastService,
    private deleteService: DeleteRecordService,
    private sharedAssetService: SharedAssetsService
  ) {}

  ngOnInit(): void {
    this.getAllAssets();
    this.assetService.getAssetTypes().subscribe((res) => {
      this.assetTypes = res;
    })
  }

  getAllAssets(): void {
    this.assetService.getAssetList().subscribe((list) => {
      this.assetList = list;
    });
  }

  deleteAsset(id: string, type: string): void {
    this.deleteService.sendId(id);
    this.deleteService.sendType(type);
  }

  sendData(asset: Asset) {
    this.sharedAssetService.sendData(asset);
    this.navigateTo(asset.id!, asset.assetStatus!);
  }

  getStatus(assetStatus: number) {
    switch (assetStatus) {
      case 1:
        this.status.class = 'text-bg-success';
        this.status.text = 'Free';
        return this.status;
      case 2:
        this.status.class = 'text-bg-primary';
        this.status.text = 'Acquired';
        return this.status;
      case 3:
        this.status.class = 'text-bg-danger';
        this.status.text = 'Damaged';
        return this.status;
      case 4:
        this.status.class = 'text-bg-warning';
        this.status.text = 'Maintenance';
        return this.status;
      case 5:
        this.status.class = 'text-bg-secondary';
        this.status.text = 'Disposal';
        return this.status;
      default:
        this.status.class = 'text-bg-success';
        this.status.text = 'Free';
        return this.status;
    }
  }

  navigateTo(id: string, status: AssetStatusEnum) {
    if (status == 5) {
      this.router.navigate(['disposals', id]);
      return;
    }
    this.router.navigate(['assets', id]);
  }

  filterDataByStatus(status: AssetStatusEnum) {
    // console.log("method invoked");
    this.assetService
      .getAssetList()
      .pipe(
        filter((list) => {
          list.forEach((asset) => {
            return asset.assetStatus === status;
          });
          return true;
        })
      )
      .subscribe((list) => {
        this.assetList = list;
        console.log('method invoked');
      });
  }

  onStatusChange(status:HTMLSelectElement) {
    this.isFilterApplied = true;
    // console.log(statusSelected)
    this.filterStatus = status.value;
  }

  onCategoryChange(category:HTMLSelectElement) {
    this.isFilterApplied = true;
    // console.log(statusSelected)
    this.filterCategory = category.value;
  }

  onRemoveFilters(status:HTMLSelectElement, category:HTMLSelectElement) {
    this.filterStatus = "";
    this.filterCategory = "";
    status.value = "-Status-";
    category.value = "-Category-"
    this.isFilterApplied = false;
  }
}
