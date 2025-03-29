
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctotAssignNotificationsService {
   urlMessage: string = environment.doctorAssignHub;// temp api images
  doctotAssignListConnection: HubConnection = new HubConnectionBuilder().withUrl(this.urlMessage, {
    accessTokenFactory: () => localStorage.getItem('token')!
  }).build();
  constructor() { }
  studyListListStart() {
    this.doctotAssignListConnection.start();
  }
  studyListClose() {
    this.doctotAssignListConnection.stop();
  }
}

