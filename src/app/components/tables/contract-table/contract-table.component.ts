import { ContractService } from './../../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../Models/contract';
import { Contract_tHeaders } from './contract-tHeaders';
import { PageSettingsModel, foreignKeyData } from '@syncfusion/ej2-angular-grids';
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

  timestamp: string = '2024-07-01T18:22:07.835689';
  date: string = '';
  time: string = '';

  apiUrl = this.contractServ.apiUrl;
  public pageSetting: PageSettingsModel = {
    pageSize: 10
  }

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

  getVendorName(id: number): string {
    let vendor = '';
    if (this.vendors) {
      vendor = this.vendors.find(v => v.id === id.toString())?.name ?? '';
    }
    console.log(vendor);
    return vendor ?? '';
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
