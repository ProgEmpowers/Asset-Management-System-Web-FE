import { NotificationService } from './../../../services/notification.service';
import { NotificationsComponent } from './../../../notifications/notifications.component';
import { Component, OnInit } from '@angular/core';
import { DataStateChangeEventArgs, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { NotificationAlert } from '../../../Models/notification-alert';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrl: './notifications-table.component.scss'
})
export class NotificationsTableComponent implements OnInit{

  notificationList?: NotificationAlert[];

  public pageSetting:PageSettingsModel = {
    pageSize:6
  }

  constructor(
    private notificationService: NotificationService,
    private toastr: NgToastService
    ){}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() : void {
    this.notificationService.getAllNotifications()
    .subscribe(
      (list) => {
        this.notificationList = list;
      }
    )
  }

  deleteNotification(id:number): void{
    this.notificationService.deleteNotification(id)
    .subscribe(
      (res) => {
        this.toastr.success({detail:"Notification deleted", summary:"Notification deleted successfully.", duration:5000});
        this.getNotifications();
      }
    )
  }

}
