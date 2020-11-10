import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClientListService {

  constructor(private http: Http) { }

  public getClientList(sessionID, userID) {
    const params = new URLSearchParams();
    params.set('uniqSessionID', sessionID);
    params.set('userID', userID);
    const local_registration_url = AppComponent.urlPath + 'client/ClientList';
    return this.http.get(local_registration_url, { params }).map(response => response.json()).map(data => {
      return data;
    });
  }

  public getJobsDetail(): Observable<any> {
    const getHomeDetails_url =
      AppComponent.urlPath + "client/ClientJobDetails";
    return this.http
      .get(getHomeDetails_url)
      .map(response => response.json()["jobDetails"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }
}
