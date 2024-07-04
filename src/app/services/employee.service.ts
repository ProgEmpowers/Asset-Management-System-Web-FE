import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../Models/employee';
import { Asset } from "../Models/asset";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  apiurl = "https://localhost:7229/api/User";
  apiurl2 = 'https://localhost:7229/api/Auth/register?addAuth=true';
  apiUrl3 = "https://localhost:7095/api/Assets/GetAssetByUserAsync"

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

   constructor(private http:HttpClient , private CookieService: CookieService) { }


   sendData(data: any) {
    this.dataSubject.next(data);
  }


  // Get all employees from server

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
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(this.apiurl + "/" + id);
  }

  // Submit new employee to server
  createEmployee(employee: FormData): Observable<any> {
    console.log(employee);
    return this.http.post(this.apiurl2, employee);
  }

  // Get all employees from serve
  getEmployeeAssets(email: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl3 + "/" + email);
  }

  getUserCountInRole(roleName: string): Observable<number> {
    console.log("get");
    return this.http.get<number>(`${this.apiurl}/count/${roleName}`);
     
  }


  getEmployeeByEmail(email: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiurl}/GetUserByEmail/${email}`);
  }

  getEmployeeListWithRole(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiurl}/WithRole`);
  }

  getDeletedEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiurl}/deleted`);
  }

  recoverDeletedUser(id: string): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiurl}/recoverDeletedUser/${id}`, {});
  }

}
