import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../Models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

   apiurl = "https://localhost:7229/api/User";
   apiurl2 = 'https://localhost:7229/api/Auth/register?addAuth=true';

   constructor(private http:HttpClient , private CookieService: CookieService) { }



   // Get all employees from server
   getEmployeeList() : Observable<Employee[]> {
     return this.http.get<Employee[]>(this.apiurl + '')
   }

   // delete employee by id
  deleteEmployee(id: string) : Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }

  // Submit new employee to server
  createEmployee(employee: FormData) : Observable<any> {
    console.log.apply("da");
    return this.http.post(this.apiurl2, employee);
  }
}




