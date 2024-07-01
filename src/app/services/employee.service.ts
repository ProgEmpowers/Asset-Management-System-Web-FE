import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../Models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

   apiurl = "https://localhost:7229/api/User";
   apiurl2 = 'https://localhost:7229/api/Auth/register?addAuth=true';

   constructor(private http:HttpClient , private CookieService: CookieService) { }

  
   sendData(data: any) {
    this.dataSubject.next(data);
  }


   // Get all employees from server
   getEmployeeList() : Observable<Employee[]> {
     return this.http.get<Employee[]>(this.apiurl + '')
   }

 // Get a single employee from server
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.apiurl + '/' + id);
  }

  

 // update employee
  updateEmployee(id: string, employee: Employee): Observable<any> {
    return this.http.put(this.apiurl + '/' + id, employee);
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




