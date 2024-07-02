import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssignAssetEmployeeSideService } from '../../services/assign-asset-employee-side.service';
import { EmployeeService } from '../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from '../../Models/employee';
import { UserAsset } from '../../Models/user-assets';
import { AssetStockService } from '../../services/asset-stock.service';
import { AssetStatusEnum } from '../../Models/AssetStatusEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-asset-employee-side',
  templateUrl: './assign-asset-employee-side.component.html',
  styleUrl: './assign-asset-employee-side.component.scss',
})
export class AssignAssetEmployeeSideComponent implements OnInit {
  assetList?: Asset[];
  selectedAsset?: string;
  //  selectedAssetId: number | null = null; // to hold the selected asset id
  public employeeEdit_ID: string = '';
  selectedEmployee!: Employee;
  assetTypes: string[] = [];
  selectedAssetType?: string;
  filteredAssets: Asset[] = [];

  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private assignAssetsService: AssignAssetEmployeeSideService,
    private assetService: AssetStockService,
    private router: Router
  ) {
    // Getting asset data to the modal
    this.employeeService.data$.subscribe((data) => {
      this.employeeEdit_ID = data;
      this.employeeService
        .getEmployeeById(this.employeeEdit_ID)
        .subscribe((employee) => {
          this.selectedEmployee = employee;
        });
    });
  }

  ngOnInit(): void {
    this.getAllAssetTypes();
  }
  getAllAssetTypes() {
    this.assignAssetsService.getAssetTypes().subscribe((types) => {
      this.assetTypes = types;
    });
  }

  onAssetTypeChange() {
    if (this.selectedAssetType) {
      this.assignAssetsService
        .getAssetsByType(this.selectedAssetType)
        .subscribe((assets) => {
          this.filteredAssets = assets;
        });
    } else {
      this.filteredAssets = [];
    }
  }

  // Called when an asset is selected
  // async onAssetSelected() {
  //   if (this.selectedAsset != null && this.selectedEmployee.id) {
  //     const userAsset: UserAssets = {
  //       userId: this.selectedEmployee.id,
  //       assetId: parseInt(this.selectedAsset),
  //       assetAssignedTime: new Date(),
  //     };
  //     console.log('update');
  //     console.log(typeof userAsset.userId);
  //     console.log(typeof userAsset.assetId);
  //     console.log(this.selectedAsset);
  //     await this.updateAssetStatus();

  //     this.assignAssetsService.assignAssetToUser(userAsset).subscribe({
  //       next: () => {

  //         this.toast.success({
  //           summary: 'Asset assigned successfully',
  //           detail: 'Asset assigned!',
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Failed to assign asset', err);
  //         this.toast.error({
  //           detail: err.message,
  //         });
  //       },
  //     });
  //   } else {
  //     this.toast.warning({
  //       detail: 'Please select an asset',
  //       summary: '',
  //       duration: 3000,
  //     });
  //   }
  //   this.resetForm();
  // }

  async onAssetSelectedAsync() {
    if (this.selectedAsset != null && this.selectedEmployee.id) {
      const userAsset: UserAsset = {
        userId: this.selectedEmployee.id,
        assetId: parseInt(this.selectedAsset),
        assetAssignedTime: new Date(),
      };

      this.assetService.assignAsset(userAsset).subscribe({
        next: (res) => {
          this.toast.success({
            summary: 'Asset assigned successfully',
            detail: `Asset assigned!`,
          });
          this.resetForm();
          this.reloadComponent(true);
        },
        error: (err) => {
          this.toast.error({
            summary: 'Asset assigning failed',
            detail: 'Something went wrong',
          });
        },
      });
    } else {
      this.toast.warning({
        detail: 'Please select an asset',
        summary: '',
        duration: 3000,
      });
    }
  }

  // Reset the form state
  resetForm() {
    this.selectedAsset = undefined;
    this.selectedAssetType = undefined;
    this.filteredAssets = [];
    console.log('Form reset');
  }

  //Update Asset
  private asset?: Asset;

  async updateAssetStatus() {
    try {
      this.asset = await this.assetService.GetAssetById(this.selectedAsset!);
    } catch (error) {
      console.log(error);
    }
    if (this.asset) {
      this.asset.assetStatus = AssetStatusEnum.Acquired;
      this.asset.userId = this.selectedEmployee.email;
      await this.assetService.updateAssetAsync(this.asset.id!, this.asset);
    }
    console.log('updated: ', this.asset?.assetStatus);
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log('Current route I am on:', this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }
}
