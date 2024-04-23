import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject, map } from 'rxjs';
import { Vendor } from '../Models/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends Subject<DataStateChangeEventArgs> {

  apiurl = "https://localhost:7095/api/Vendors";
  pageUrl = "?pageNumber=1&pageSize=10";

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  constructor(private http:HttpClient) { super();}


  // Get all vendors from server through the API
  getAllVendors() : Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiurl + this.pageUrl)
  }

  getVendorList() : Observable<string[]> {
    return this.http.get<string[]>(this.apiurl + '/names')
  }
  
  // Submit new vendor to server
  createVendor(vendor: FormData) : Observable<any> {
    return this.http.post(this.apiurl, vendor);
  }

  // Update a vendor
  updateVendor(id: number, vendor: FormData) : Observable<any> {
    return this.http.put(this.apiurl + '/' + id, vendor);
  }

  // Delete a vendor
  deleteVendor(id: number) : Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }
}
