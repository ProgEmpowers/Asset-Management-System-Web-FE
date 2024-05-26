import { ContractService } from './../../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../Models/contract';
import { Contract_tHeaders } from './contract-tHeaders';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrl: './contract-table.component.scss'
})
export class ContractTableComponent implements OnInit{
  
  public contracts?: Contract[];
  public contract_tHeaders = Contract_tHeaders;

  apiUrl = this.contractServ.apiUrl;
  public pageSetting: PageSettingsModel = {
    pageSize: 10
  }

  constructor(
    private contractServ: ContractService
  ) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts(): void {
    this.contractServ.getAllContracts().subscribe(
      (list) => {
        this.contracts = list ?? [];
      }
    )
  }



}
