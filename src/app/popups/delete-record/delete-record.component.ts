import { DeleteRecordService } from '../../services/delete-record.service';
import { VendorService } from '../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Vendor } from '../../Models/vendor';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../Models/employee';
import { AssetStockService } from '../../services/asset-stock.service';
import { Asset } from '../../Models/asset';

@Component({
  selector: 'app-delete-record',
  templateUrl: './delete-record.component.html',
  styleUrl: './delete-record.component.scss',
})
export class DeleteRecordComponent implements OnInit {
  delete_type: string = '';
  delete_id: string = '';
  public vendors?: Vendor[];
  public employees?: Employee[];
  public assets?: Asset[];

  constructor(
    private toastServ: NgToastService,
    private vendorService: VendorService,
    private employeeService: EmployeeService,
    private deleteService: DeleteRecordService,
    private assetService: AssetStockService,
    private router: Router
  ) {
    this.deleteService.deleteID$.subscribe((data) => {
      this.delete_id = data;
    });
    this.deleteService.deleteTYPE$.subscribe((data) => {
      this.delete_type = data;
    });
  }

  ngOnInit(): void {}

  deleteRecord() {
    if (this.delete_type == 'vendor') {
      this.deleteVendor(this.delete_id);
      console.log('Ready to delete vendor....');
    } else if (this.delete_type == 'employee') {
      this.deleteEmployee(this.delete_id);
      console.log('Ready to delete vendor....');
    } else if (this.delete_type == 'asset') {
      this.deleteAsset(this.delete_id);
    }
    console.log('delete-id: ' + this.delete_id);
    console.log('delete-type: ' + this.delete_type);
    this.delete_id = '';
    this.delete_type = '';
  }

  deleteVendor(id: string): void {
    this.vendorService.deleteVendor(id).subscribe(
      () => {
        this.toastServ.success({ detail: "Vendor deleted successfully.", summary: "Vendor is deleted successfully from the system.", duration: 5000 });
        this.vendorService.getAllVendors().subscribe(
          (list) => {
            this.vendors = list ?? [];
            this.reloadComponent(true);
          }
        );
      }, err => {
        this.toastServ.error({ detail: "Deleting Vendor Failed.", summary: "Failed to delete vendor from the system.", duration: 5000 });
      }
    );
    console.log("deleted-id: " + id);
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.toastServ.success({
          detail: 'Employee deleted successfully.',
          summary: 'Employee is deleted successfully from the system.',
          duration: 5000,
        });
        this.employeeService.getEmployeeList().subscribe((list) => {
          this.employees = list ?? [];
          this.reloadComponent(true);
        });
      },
      (err) => {
        this.toastServ.error({
          detail: 'Deleting Employee Failed.',
          summary: 'Failed to delete employee from the system.',
          duration: 5000,
        });
      }
    );
    console.log('deleted-id: ' + id);
  }

  deleteAsset(id: string): void {
    this.assetService.deleteAsset(id).subscribe(
      () => {
        this.toastServ.success({
          detail: 'Asset deleted successfully.',
          summary: 'Asset is deleted successfully from the system.',
          duration: 5000,
        });
        this.assetService.getAssetList().subscribe((list) => {
          this.assets = list ?? [];
          this.reloadComponent(true);
        });
      },
      (err) => {
        this.toastServ.error({
          detail: 'Deleting Asset Failed.',
          summary: 'Failed to delete asset from the system.',
          duration: 5000,
        });
      }
    );
    console.log('deleted-id: ' + id);
  }

  reloadComponent(self: boolean, urlNavigator?: string) {
    console.log('Current route I am on: ', this.router.url);
    const url = self ? this.router.url : urlNavigator;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`);
      });
    });
  }
}
