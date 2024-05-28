import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset } from '../Models/asset';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisposalService {

  apiurl = "http://localhost:5240/api/Assets/getAllDeletedAssets"; 

  constructor(private http:HttpClient) { }

  getAllDeleteAssetList(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiurl + '')
  }

  deleteAsset(id: number) : Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }
}
