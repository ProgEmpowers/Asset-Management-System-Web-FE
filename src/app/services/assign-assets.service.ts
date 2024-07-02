import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Employee } from '../Models/employee';
import { UserAsset } from '../Models/user-assets';

@Injectable({
  providedIn: 'root',
})
export class AssignAssetsService {
  apiurl = 'https://localhost:7229/api/User';
  apiurl2 = 'https://localhost:7229/api/Auth/register';
  apiUrl3 = "https://localhost:7229/api/User/AssignAssetAsync/";


  constructor(private http: HttpClient) {}

  // Get all employees from server to list
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiurl + '');
  }

  async assignAsset(userAsset:UserAsset) {
    return await lastValueFrom(this.http.post<UserAsset>(this.apiUrl3, userAsset));
  }
}
