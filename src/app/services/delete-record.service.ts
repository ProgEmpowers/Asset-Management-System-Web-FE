import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteRecordService {

  private deleteRecord_id = new Subject<any>();
  deleteID$ = this.deleteRecord_id.asObservable();

  private deleteRecord_type = new Subject<any>();
  deleteTYPE$ = this.deleteRecord_type.asObservable();

  constructor() { }

  sendId(id: number) {
    this.deleteRecord_id.next(id);
  }

  sendType(type: string) {
    this.deleteRecord_type.next(type);
  }
}
