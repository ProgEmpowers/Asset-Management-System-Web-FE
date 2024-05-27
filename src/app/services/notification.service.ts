import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationAlert } from '../Models/notification-alert';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiurl = "https://localhost:7095/api/Notifications";



  constructor(private http:HttpClient) { }


  // Get all assets from server
  getAllNotifications() : Observable<NotificationAlert[]> {
    return this.http.get<NotificationAlert[]>(this.apiurl + '')
  }

  deleteNotification(id: number) : Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }
}
