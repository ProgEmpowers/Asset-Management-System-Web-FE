import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, count, lastValueFrom, map } from "rxjs";
import { Asset } from "../Models/asset";
import { DataStateChangeEventArgs } from "@syncfusion/ej2-angular-grids";
import { UserAsset } from "../Models/user-assets";

@Injectable({
  providedIn: "root",
})
export class AssetStockService extends Subject<DataStateChangeEventArgs> {
  apiurl = "https://localhost:7095/api/Assets";
  apiurl1 = "https://localhost:7095/api/Assets/GetNoOfAssetsByStatusAsync";
  apiurl2 = "https://localhost:7095/api/Assets/GetAssetsByStatusAsync";
  apiurl3 = "https://localhost:7095/api/Assets/GetTotalNoOfAssetsAsync";
  apiUrl4 = "https://localhost:7229/api/User/AssignAssetAsync/";
  apiUrl5 = "https://localhost:7229/api/User/ReleaseAsset";


  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  constructor(private http: HttpClient) {
    super();
  }

  // Get all assets from server
  getAssetList(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiurl + "");
  }

  // Get a single asset from server
  async GetAssetById(id: string) {
    return await lastValueFrom(this.http.get<Asset>(this.apiurl + "/" + id));
  }

  // Get assets by status from server
  GetAssetByStatus(status: number): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiurl2 + "/" + status);
  }

  // Get total no of assets from server
  GetTotalNoOfAsset(): Observable<number> {
    return this.http.get<number>(this.apiurl3);
  }

  // Get no of assets by status from server
  GetNoOfAssetByStatus(status: number): Observable<number> {
    return this.http.get<number>(this.apiurl1 + "/" + status);
  }

  // Submit new asset to server
  createAsset(asset: FormData): Observable<any> {
    return this.http.post(this.apiurl, asset);
  }

  // delete an asset
  deleteAsset(id: string): Observable<any> {
    return this.http.delete(this.apiurl + "/" + id);
  }

  // delete an asset
  async deleteAssetAsync(id: string) {
    return await lastValueFrom(this.http.delete(this.apiurl + "/" + id));
  }

  // update an asset
  updateAsset(id: string, asset: Asset): Observable<any> {
    return this.http.put(this.apiurl + "/" + id, asset);
  }

  async updateAssetAsync(id: string, asset: Asset) {
    return await lastValueFrom(this.http.put(this.apiurl + "/" + id, asset));
  }

  assignAsset(userAsset:UserAsset) {
    return this.http.post<UserAsset>(this.apiUrl4, userAsset);
  }

  releaseAsset(userAsset:UserAsset) {
    return this.http.delete<any>(this.apiUrl5, {
      body:userAsset
    });
  }
}
