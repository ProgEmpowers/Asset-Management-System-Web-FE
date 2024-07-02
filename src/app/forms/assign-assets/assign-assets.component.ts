import { Component } from '@angular/core';
import { Employee } from '../../Models/employee';
import { AssignAssetsService } from '../../services/assign-assets.service';
import { AssetStockService } from '../../services/asset-stock.service';
import { Asset } from '../../Models/asset';
import { NgToastService } from 'ng-angular-popup';
import { AssetStatusEnum } from '../../Models/AssetStatusEnum';
import { Router } from '@angular/router';
import { AssignAssetEmployeeSideService } from '../../services/assign-asset-employee-side.service';
import { UserAsset } from '../../Models/user-assets';

@Component({
  selector: 'app-assign-assets',
  templateUrl: './assign-assets.component.html',
  styleUrl: './assign-assets.component.scss',
})
export class AssignAssetsComponent {
  employeeList?: Employee[];
  selectedEmployee?: string;
  public assetEdit_ID: string = '';
  selectedAsset!: Asset;

  constructor(
    private assignAssetsService: AssignAssetsService,
    private assetService: AssetStockService,
    private assignAssetsEmployeeService: AssignAssetEmployeeSideService,
    private toast: NgToastService,
    private router: Router
  ) {
    // Getting asset data to the modal
    this.assetService.data$.subscribe((data) => {
      this.assetEdit_ID = data;
      this.getAsset();
    });
  }

  async getAsset() {
    this.selectedAsset = await this.assetService.GetAssetById(
      this.assetEdit_ID
    );
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  // calling AssignAssetsService service method
  getAllEmployees() {
    this.assignAssetsService.getEmployeeList().subscribe((list) => {
      this.employeeList = list;
    });
  }

  //Setting up the assigning functionality
  async onAssign(selectedEmployee: string) {
    const userAsset: UserAsset = {
      userId: selectedEmployee,
      assetId: parseInt(this.selectedAsset.id!),
      assetAssignedTime: new Date(),
    };

    this.assetService.assignAsset(userAsset).subscribe({
      next: (res) => {
        this.toast.success({
          summary: 'Asset assigned successfully',
          detail: `Asset assigned!`,
        });
        this.selectedEmployee = '';
        this.reloadComponent(true);
      },
      error: (err) => {
        this.toast.error({
          summary: 'Asset assigning failed',
          detail: 'Something went wrong',
        });
      },
    });
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
