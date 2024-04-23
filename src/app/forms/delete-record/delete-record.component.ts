import { DeleteRecordService } from './../../services/delete-record.service';
import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Vendor } from '../../Models/vendor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-record',
  templateUrl: './delete-record.component.html',
  styleUrl: './delete-record.component.scss'
})
export class DeleteRecordComponent implements OnInit {

  delete_type: string = '';
  delete_id: number = 0;
  public vendors?: Vendor[];



  constructor(
    private toastServ: NgToastService,
    private vendorService: VendorService,
    private deleteService: DeleteRecordService,
    private router: Router
  ) {
    this.deleteService.deleteID$.subscribe(data => {
      this.delete_id = data;
    });
    this.deleteService.deleteTYPE$.subscribe(data => {
      this.delete_type = data;
    });
  }

  ngOnInit(): void {
  }

  deleteRecord() {
    if (this.delete_type == 'vendor') {
      this.deleteVendor(this.delete_id);
      console.log("Ready to delete vendor....");
    }
    console.log("delete-id: " + this.delete_id);
    console.log("delete-type: " + this.delete_type);
    this.delete_id = 0;
    this.delete_type = '';
  }

  deleteVendor(id: number): void {
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
        this.toastServ.error({ detail: "Adding Vendor Failed.", summary: "Failed to add vendor to the system.", duration: 5000 });
      }
    );
    console.log("deleted-id: " + id);
  }

  reloadComponent(self: boolean, urlNavigator?: string) {
    console.log("Current route I am on: ", this.router.url);
    const url = self ? this.router.url : urlNavigator;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`)
      })
    })
  }
}
