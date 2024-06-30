import { DeleteRecordService } from './../../../services/delete-record.service';
import { Vendor_tHeaders } from './vendor-tHeaders';
import { Component, Input, OnInit } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { VendorService } from '../../../services/vendor.service';
import { Vendor } from '../../../Models/vendor';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteRecordComponent } from '../../../forms/delete-record/delete-record.component';

@Component({
  selector: 'app-vendors-table',
  templateUrl: './vendors-table.component.html',
  styleUrl: './vendors-table.component.scss'
})
export class VendorsTableComponent implements OnInit {

  public vendors?: Vendor[];
  public vendor_tHeaders = Vendor_tHeaders;
  styleClass: string = '';

  vendorReload: boolean = false;
  ongoingDelete_type = '';

  apiUrl = this.vendorService.apiurl;

  public pageSetting: PageSettingsModel = {
    pageSize: 10
  }

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private toastServ: NgToastService,
    private deleteService: DeleteRecordService
  ) { 
    
  }

  ngOnInit(): void { 
    this.getAllVendors();
  }

  assetStyle(asset: string): string  {
    if (asset === 'Other Devices' || asset === 'Multiple Devices') {
      this.styleClass = 'otherDevices';
    } else {
      this.styleClass = '';
    }
    return this.styleClass;
  }


  // Get all vendors
  getAllVendors(): void {
    this.vendorService.getAllVendors()
      .subscribe(
        (list) => {
          this.vendors = list ?? [];
        }
      )
  }

  updateVendor(id: number): void {
    this.vendorService.sendData(id);
    console.log("vendor id to edit: " + this.vendorService.data$);
  }

  // sendDataToOtherComponent() {
  //   this.vendorService.sendData(this.editVendor_id);
  // }

  // deleteVendor(id: number): void {
  //   this.vendorService.deleteVendor(id)
  //     .subscribe(
  //       () => {
  //         this.toastServ.success({ detail: "Vendor deleted successfully.", summary: "Vendor is deleted successfully from the system.", duration: 5000 });
  //         this.getAllVendors();
  //       }
  //     )
  // }

  deleteVendor(id: string, type: string): void {
    this.deleteService.sendId(id);
    this.deleteService.sendType(type);

    console.log(type);
  }

  print(data:number){
    console.log(data)
  }
}
