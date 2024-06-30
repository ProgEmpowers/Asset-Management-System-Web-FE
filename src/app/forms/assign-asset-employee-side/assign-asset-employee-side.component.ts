import { Component, OnInit } from '@angular/core';
import { Asset } from '../../Models/asset';
import { AssignAssetEmployeeSideService } from '../../services/assign-asset-employee-side.service';
import { EmployeeService } from '../../services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from '../../Models/employee';
import { UserAssets } from '../../Models/user-assets';

@Component({
  selector: 'app-assign-asset-employee-side',
  templateUrl: './assign-asset-employee-side.component.html',
  styleUrl: './assign-asset-employee-side.component.scss'
})
export class AssignAssetEmployeeSideComponent implements OnInit{

  assetList?: Asset[];
  selectedAsset?: string;
//  selectedAssetId: number | null = null; // to hold the selected asset id
  public employeeEdit_ID: string = '';
  selectedEmployee!: Employee;
  assetTypes: string[] = [];
  selectedAssetType?: string;
  filteredAssets: Asset[] = [];

  constructor(private employeeService: EmployeeService,
    private toast: NgToastService, 
    private assignAssetsService: AssignAssetEmployeeSideService,){

     // Getting asset data to the modal
    this.employeeService.data$.subscribe((data) => {
      this.employeeEdit_ID = data;
      this.employeeService.getEmployeeById(this.employeeEdit_ID).subscribe((employee) => {
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
      this.assignAssetsService.getAssetsByType(this.selectedAssetType).subscribe((assets) => {
        this.filteredAssets = assets;
      });
    } else {
      this.filteredAssets = [];
    }
  }

  // Called when an asset is selected
  onAssetSelected() {
    if (this.selectedAsset != null && this.selectedEmployee.id) {
      const userAsset: UserAssets = {
        userId: this.selectedEmployee.id,
        assetId: parseInt(this.selectedAsset),
        assetAssignedTime:new Date(),
      };
      console.log("update");
      console.log(typeof userAsset.userId);
      console.log(typeof userAsset.assetId);

      this.assignAssetsService.assignAssetToUser(userAsset).subscribe({
        next: () => {
          this.toast.success({
            summary: 'Asset assigned successfully',
            detail: 'Asset assigned!',
          });
          
        },
        error: (err) => {
          console.error('Failed to assign asset', err);
          this.toast.error({
            detail: err.message,
          });
        }
      });
    }else{
       this.toast.warning({ detail: 'Please select an asset', summary: '', duration: 3000 });
   
    }
    this.resetForm();
  }

  // Reset the form state
  resetForm() {
    this.selectedAsset = undefined;
    this.selectedAssetType = undefined;
    this.filteredAssets = [];
    console.log("Form reset");
  }
    
  

}
