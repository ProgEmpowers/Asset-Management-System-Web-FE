import { Component, OnInit } from '@angular/core';
import { Asset } from '../Models/asset';
import { AssetStockService } from '../services/asset-stock.service';
import { Vendor } from '../Models/vendor';
import { VendorService } from '../services/vendor.service';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user?: User;
  assetList: Asset[] = [];
  freeAssets: Asset[] = [];
  acquiredAssets: Asset[] = [];
  vendorList: Vendor[] = [];
  employeeList: Employee[]=[];

  constructor(private assetService: AssetStockService, private vendorService: VendorService, private employeeService: EmployeeService, private authService: AuthService){
  }

  ngOnInit(): void {
    this.getUser()
    this.getAssets();
    this.getVendors();
    this.getEmployees();
  }

  getAssets() : void {
    this.assetService.getAssetList()
    .subscribe(
      (list) => {
        this.assetList = list;
      }
    )
  }

  getUser() : void {
      this.user = this.authService.getUser();
      console.log(this.user)
  }

  getEmployees() : void {
    this.employeeService.getEmployeeList()
    .subscribe(
      (list) => {
        this.employeeList=list;
      }
    )
  }

  getVendors(): void {
    this.vendorService.getAllVendors()
    .subscribe(
      (list) => {
        this.vendorList = list;
      }
    )
  }

}
