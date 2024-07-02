import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedEmployeesService {

  constructor() { }

  private dataSubject = new BehaviorSubject<Employee>({});
  data$ = this.dataSubject.asObservable();

  sendData(data: Employee) {
    this.dataSubject.next(data);
  }
}
