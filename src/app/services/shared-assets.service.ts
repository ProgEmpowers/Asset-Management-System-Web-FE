import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Asset } from '../Models/asset';

@Injectable({
  providedIn: 'root',
})
export class SharedAssetsService {

  constructor() {}

  private dataSubject = new BehaviorSubject<Asset>({});
  data$ = this.dataSubject.asObservable();

  sendData(data: Asset) {
    this.dataSubject.next(data);
  }
}
