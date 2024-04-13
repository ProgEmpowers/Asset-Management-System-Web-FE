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



  constructor(private http:HttpClient) { super();}



  // Get all vendors through the API
  getAllVendors() : Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiurl + '')
  }
}
