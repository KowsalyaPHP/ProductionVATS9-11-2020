import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable()
export class RockregisterService {

  constructor(private http: Http) { }

  public addCustomerRegistration(customerFormObj: any) {
    const params = new URLSearchParams();
    params.set('first_name', customerFormObj.first_name);
    params.set('last_name', customerFormObj.last_name);
    params.set('company_name', customerFormObj.company_name);
    params.set('mobile_number', customerFormObj.mobile_number);
    params.set('email', customerFormObj.email);
    params.set('employer_type', customerFormObj.employer_type);

    const local_registration_url = AppComponent.urlPath + 'rockclientRegistration/GetRockclientRegistration';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }
}
