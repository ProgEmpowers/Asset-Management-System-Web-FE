import { Component } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {

  public employees?: Observable<DataStateChangeEventArgs>;

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

}
