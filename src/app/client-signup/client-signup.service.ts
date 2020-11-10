import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable()
export class ClientSignupService {

  constructor(private http: Http) { }

  public addCustomerRegistration(customerFormObj: any) {
    const params = new URLSearchParams();
    params.set('first_name', customerFormObj.first_name);
    params.set('last_name', customerFormObj.last_name);
    params.set('company_name', customerFormObj.company_name);
    params.set('company_website', customerFormObj.company_website);
    params.set('company_address', customerFormObj.company_address);
    params.set('city', customerFormObj.city);
    params.set('state', customerFormObj.state);
    params.set('country', customerFormObj.country);
    params.set('pincode', customerFormObj.pincode);
    params.set('contact_number', customerFormObj.contact_number);
    params.set('mobile_number', customerFormObj.mobile_number);
    params.set('email', customerFormObj.email);
    params.set('SPOC_name', customerFormObj.SPOC_name);
    params.set('SPOC_mobile_number', customerFormObj.SPOC_mobile_number);
    params.set('SPOC_email', customerFormObj.SPOC_email);
    params.set('industry', customerFormObj.industry);
    params.set('employee_number', customerFormObj.employee_number);
    params.set('password', customerFormObj.password);
    params.set('employer_type', customerFormObj.employer_type);

    const local_registration_url = AppComponent.urlPath + 'employerRegistration/AddEmpRegistration';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

}
