import { Component } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrl: './notifications-table.component.scss'
})
export class NotificationsTableComponent {

  public notifications!: Observable<DataStateChangeEventArgs>;

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

}
