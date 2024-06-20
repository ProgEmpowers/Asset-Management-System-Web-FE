import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, count, map } from 'rxjs';
import { Asset } from '../Models/asset';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';

@Injectable({
  providedIn: 'root',
})
export class AssetStockService extends Subject<DataStateChangeEventArgs> {
  apiurl = 'https://localhost:7095/api/Assets';

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
    return this.http.get<Asset[]>(this.apiurl + '');
  }

  // Get a single asset from server
  GetAssetById(id: string): Observable<Asset> {
    return this.http.get<Asset>(this.apiurl + '/' + id);
  }

  // Submit new asset to server
  createAsset(asset: FormData): Observable<any> {
    return this.http.post(this.apiurl, asset);
  }

  // delete an asset
  deleteAsset(id: string): Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }

  // update an asset
  updateAsset(id: string, asset: Asset): Observable<any> {
    return this.http.put(this.apiurl + '/' + id, asset);
  }
}
