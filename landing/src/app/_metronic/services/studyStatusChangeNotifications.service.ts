import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudyStatusChangeNotificationsService {
  baseUrl = environment.StudyStatusHub;
  urlMessage: string = environment.StudyStatusHub;// temp api images
  StudyListConnection: HubConnection = new HubConnectionBuilder().withUrl(this.urlMessage, {
    accessTokenFactory: () => localStorage.getItem('token')!
  }).build();
  constructor() { }
  studyListListStart() {
    this.StudyListConnection.start();
  }
  studyListClose() {
    this.StudyListConnection.stop();
  }
}
