import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends Subject<DataStateChangeEventArgs>  {

  constructor(private http:HttpClient) { super(); }
}
