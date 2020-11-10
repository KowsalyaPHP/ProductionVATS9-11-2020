import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {AppComponent} from '../../app.component'

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  public saveContactData(contactFormObj: any) {
    const params = new URLSearchParams();

    params.set('contactname', contactFormObj.contactname);
    params.set('contactemail', contactFormObj.contactemail);
    params.set('subject', contactFormObj.subject);
    params.set('message', contactFormObj.message);
    params.set('partnerType', contactFormObj.partnerType);

    const contact_url = AppComponent.urlPath+'contact/SaveContact';
    return this.http.post(contact_url, params)
      .map(response => response.json()['ContactDetails']).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }


}
