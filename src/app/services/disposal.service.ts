import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DisposalAsset } from "../Models/disposalAsset";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DisposalService {
  baseUrl = "https://localhost:7095/api/Assets/AddDisposalAssets";

  constructor(private http: HttpClient) {}

  addDisposalAssetAsync(
    selectedAsset: DisposalAsset
  ): Observable<DisposalAsset> {
    return this.http.post<DisposalAsset>(this.baseUrl, selectedAsset);
  }
}
