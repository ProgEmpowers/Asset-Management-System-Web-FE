import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../Models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  apiUrl = "https://localhost:7095/api/Contracts";

  constructor(private http: HttpClient) { }

  getAllContracts() : Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrl);
  }

  createContract(contract: FormData) : Observable<any> {
    return this.http.post(this.apiUrl, contract);
  }

  // updateContract(id: number, contract: FormData) : Observable<any> {
  //   return this.http.put(this.apiUrl + '/' + id, contract);
  // }

  // deleteContract(id: number) : Observable<any> {
  //   return this.http.delete(this.apiUrl + '/' + id);
  // }

}
