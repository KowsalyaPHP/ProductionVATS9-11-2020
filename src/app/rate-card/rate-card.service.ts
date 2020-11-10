import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RateCardService {

  constructor(private http: Http) { }

  public getRateCardList(sessionID, userID) {
    const params = new URLSearchParams();
    params.set('uniqSessionID', sessionID);
    params.set('userID', userID);
    const local_registration_url = AppComponent.urlPath + 'rateCard/RateCard';
    return this.http.get(local_registration_url, { params }).map(response => response.json()).map(data => {
      return data;
    });
  }

  public insertRateCard(data) {
    const local_registration_url = AppComponent.urlPath + 'rateCard/InsertRateCard';
    return this.http.post(local_registration_url, data).map(response => response.json()).map(data => {
      return data;
    });
  }

}
