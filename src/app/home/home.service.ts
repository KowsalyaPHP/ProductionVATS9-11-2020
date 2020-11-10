import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable()
export class HomeService {
  constructor(private http: Http) {
  }

  public GetHomeDetails(): Observable<any> {
    var flag = 'topCompanyList';

    let params = new URLSearchParams();
    params.append("flag", flag)

    const getHomeDetails_url = AppComponent.urlPath + 'home/GetHome';

    return this.http.get(getHomeDetails_url, { search: params })
      .map(response => response.json()['homeDetails']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }
  
  /*Changes*/
  public GetHotJobs(buId:any): Observable<any> {
  
    let params = new URLSearchParams();
    params.set("buId", buId)

    const getHomeDetails_url = AppComponent.urlPath + 'hotJobs/GetHotJobs';

    return this.http.get(getHomeDetails_url, { search: params })
      .map(response => response.json()['HotJobList']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  } 

  public getEncodedStr(username, userpwd): Observable<any> {
    const getEncodedStr_url =
      AppComponent.urlPath + "jobDetails/GetEncodedString";
    const params = new URLSearchParams();
    let param = {
      "pageType": "list",
      "cvSource": "partner",
      "reqId": 0,
      "requester": {
        "id": username,
        "code": userpwd,
        "name": ""
      }
    }

    return this.http
      .post(getEncodedStr_url, param)
      .map(response => response.json()["encodedStr"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

}
