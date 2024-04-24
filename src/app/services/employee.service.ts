import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

   apiurl = "https://localhost:7229/api/User";

   constructor(private http:HttpClient) { }

   // Get all employees from server
   getEmployeeList() : Observable<Employee[]> {
     return this.http.get<Employee[]>(this.apiurl + '')
   }

   // delete employee by id
  deleteEmployee(id: string) : Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }

}




