import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root',
})
export class AssignAssetsService {
  apiurl = 'https://localhost:7229/api/User';
  apiurl2 = 'https://localhost:7229/api/Auth/register';


  constructor(private http: HttpClient) {}

  // Get all employees from server to list
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiurl + '');
  }
}
