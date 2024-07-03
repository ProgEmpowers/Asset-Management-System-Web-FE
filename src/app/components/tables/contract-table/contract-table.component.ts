import { ContractService } from './../../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../Models/contract';
import { Contract_tHeaders } from './contract-tHeaders';
import { VendorService } from '../../../services/vendor.service';
import { Vendor } from '../../../Models/vendor';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrl: './contract-table.component.scss'
})
export class ContractTableComponent implements OnInit{
  
  public contracts?: Contract[];
  public vendors?: Vendor[];
  public vendorNames: string[] = [];
  public contract_tHeaders = Contract_tHeaders;

  filterText: string = '';
  date: string = '';
  time: string = '';
  selectedVendor: Vendor = {
    id: '',
    name: '',
    address: '',
    mobileNo: '',
    email: '',
    supplyAssetTypes: [],
    isActive: false
  };

  constructor(
    private contractServ: ContractService,
    private vendorServ: VendorService
  ) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts(): void {
    this.contractServ.getAllContracts().subscribe(
      (list) => {
        this.contracts = list ?? [];
        this.splitDateTime();
      }
    );
    this.vendorServ.getVendorList().subscribe(
      (list) => {
        this.vendors = list ?? [];
      }
    );
  }

  getVendorName(id: any): string {
    let vendor = '';
    this.vendors?.forEach((v) => {
      if (v.id === id) {
        vendor = v.name;
      }
    });
    console.log('Vendor:', vendor);
    return vendor;
  }

  changeViewClassOfVendor(id: any): string {
    let isActive = null;
    this.vendors?.forEach((v) => {
      if (v.id === id) {
        isActive = v.isActive;
      }
    });
    if (isActive == false) {
      return 'removed';
    } else {
      return '';
    }
  }

  nullStringRepresent(insert: any): string {
    if (insert === null) {
      return "No Optionals here...";
    }
    return insert;
  }

  splitDateTime(): void {
    if (this.contracts) {
      this.contracts.forEach(contract => {
        if (contract.assignedDate) {
          const dateTimeParts = contract.assignedDate.split('T');
          contract.assignedDate = dateTimeParts[0];
          contract.time = dateTimeParts[1].split('.')[0]; // Removing milliseconds
        }
      });
    }
  }

}
