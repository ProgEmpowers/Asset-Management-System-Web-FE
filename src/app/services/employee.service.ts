import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiurl = "https://localhost:7229/api/auth/register";

  constructor(private http:HttpClient) { }

  // Submit new asset to server
  createEmployee(employee: FormData) : Observable<any> {
    return this.http.post(this.apiurl, employee);
  }
}
