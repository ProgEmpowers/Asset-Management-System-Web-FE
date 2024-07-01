import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://your-api-url/notificationHub')
      .build();

    this.hubConnection.on('ReceiveNotification', (message) => {
      console.log('Received notification:', message); // Handle the received notification (e.g., show a notification to the user)
    });

    this.hubConnection.start()
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }

  public sendNotification(userId: string, message: string) {
    this.hubConnection.invoke('SendNotification', userId, message)
      .catch(err => console.error('Error while sending notification: ' + err));
  }
}
