
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudyCountNotificationsService {
  urlMessage: string = environment.StudyCountHub;// temp api images
  StudyCountConnection: HubConnection = new HubConnectionBuilder().withUrl(this.urlMessage, {
    accessTokenFactory: () => localStorage.getItem('token')!
  }).build();
  constructor() { }
  studyCountStart() {
    this.StudyCountConnection.start();
  }
  studyCountClose() {
    this.StudyCountConnection.stop();
  }
}
