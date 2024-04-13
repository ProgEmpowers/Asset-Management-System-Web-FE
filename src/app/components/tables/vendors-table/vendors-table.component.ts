import { Component } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { VendorService } from '../../../services/vendor.service';
import { Vendor } from '../../../Models/vendor';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.scss'
})
export class VendorsTableComponent {

  public vendors?: Vendor[];

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

  constructor(private vendorService:VendorService){
  }

  ngOnInit(): void {
    this.getAllVendors();
  }


  // Get all vendors
  getAllVendors() : void {
    this.vendorService.getAllVendors()
    .subscribe(
      (list) => {
        this.vendors = list ?? [];
      }
    )
  }

}
