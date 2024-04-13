import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject, count, map } from 'rxjs';
import { Asset } from '../Models/asset';


@Injectable({
  providedIn: 'root'
})
export class AssetStockService extends Subject<DataStateChangeEventArgs> {

  apiurl = "https://localhost:7095/api/Assets";



  constructor(private http:HttpClient) { super();}


  // public execute(state:any): void {
  //   this.getAssets(state).subscribe(
  //     x => super.next(x as DataStateChangeEventArgs)
  //     );
  // }

  // get assets list
  getAssetList() : Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiurl + '')
  }


  // getAssets(state?:any):Observable<any[]> {
  //   return this.http.get<any[]>(this.apiurl).pipe(
  //     map((response:any) => (<any>{
  //       result:state.take > 0 ? response.slice(0, state.take) : response,
  //       count: response.length
  //     }))
  //   );
  // }

}
