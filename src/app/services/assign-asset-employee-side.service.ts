import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../Models/asset';
import { HttpClient } from '@angular/common/http';
import { UserAssets } from '../Models/user-assets';

@Injectable({
  providedIn: 'root'
})
export class AssignAssetEmployeeSideService {

  apiurl = 'https://localhost:7095/api/Assets';
  userAssetUrl = 'https://localhost:7229/api/User';
  
  constructor(private http: HttpClient) { }

  // Get all employees from server to list
  getAssetList(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiurl + '');
  }

  getAssetTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiurl}/types`);
  }

   getAssetsByType(assetType: string): Observable<Asset[]> {
     return this.http.get<Asset[]>(`${this.apiurl}/type/${assetType}`);
   }
   assignAssetToUser(userAsset: UserAssets): Observable<any> {
    return this.http.post(this.userAssetUrl, userAsset);
  }
  
}
