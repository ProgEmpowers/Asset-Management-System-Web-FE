import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractService } from '../../services/contract.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-send-contract',
  templateUrl: './send-contract.component.html',
  styleUrl: './send-contract.component.scss'
})
export class SendContractComponent implements OnInit {

  supplyAssetTypes: string[] = [];
  vendorList: string[] = [];

  contractForm: FormGroup;

  constructor (
    private contractServ: ContractService,
    private vendorServ: VendorService,
    private router: Router,
    private toastServ: NgToastService
  ) {
    this.contractForm = new FormGroup({
      contract_title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      contract_assets: new FormControl("", Validators.required),
      contract_vendors: new FormControl("")
    })
  }

  ngOnInit(): void {
      this.supplyAssetTypes = [
        'PC',
        'Monitor',
        'Keyboard',
        'Mouse',
        'Scanner',
        'Multiple Devices'
      ];
      this.vendorServ.getVendorList().subscribe(names => {
        this.vendorList = names;
      });
  }

  submit() : void {
    if(this.contractForm.valid == false) {
      return;
    }
    this.contractServ.createContract(this.contractForm.value).subscribe(
      (data) => {
        if(data) {
          this.toastServ.success({detail: "Contract sent successfully", summary: "Contract has been sent to the relevent vendors successfully.", duration: 5000});
          this.contractForm.reset();
          this.reloadComponent(true);
          console.log(data);

        }
      }, err => {
        this.toastServ.error({detail: "Sending contract failed", summary: "Contract has not been sent due to an internal error. Please try again later.", duration: 5000});
        this.contractForm.reset();
        console.log("Bad request: ");
      }
    )
  }

  // Reload the component
  reloadComponent(self: boolean, urlNavigator?: string) {
    console.log("Current route I am on: ", this.router.url);
    const url = self? this.router.url: urlNavigator;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {   //skipLocatingChange: true - means 'don't update the url when navigating.'
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on: ${this.router.url}`)
      })
    })
  }

}
