import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable()
export class EmployerRegistrationService {
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

    const local_registration_url = AppComponent.urlPath + 'employerRegistration/AddEmpRegistration';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }
  public showEmployerRegistrationList(sessionID, userID) {
    const params = new URLSearchParams();

    params.set('uniqSessionID', sessionID);
    params.set('userID', userID);

    const local_registration_url = AppComponent.urlPath + 'employerRegistration/GetEmpRegistration';

    return this.http.get(local_registration_url, { params }).map(response => response.json()['RegistrationDetails']).map(data => {
      if (data != '')
        return data;
      else
        return 'No data';
    });
  }
  public updateStatus(id, statusVal, emailid, sessionID, userID): Observable<any> {
    const params = new URLSearchParams();
    params.set('id', id);
    params.set('status', statusVal);
    params.set('emailid', emailid);
    params.set('sessionId', sessionID);
    params.set('userId', userID);

    const local_registration_url = AppComponent.urlPath + 'employerRegistration/ChangeStatus';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

  // Below Services are to get Country,state and cities.
  public GetCountryList() {

    const getCountryList_url = AppComponent.urlPath + 'country/GetCountryList';
    return this.http.get(getCountryList_url)
      .map(response => response.json()['countryList']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  GetStateList(countryId): Observable<any> {
    var body = `${countryId}`;
    const getStateList_url = AppComponent.urlPath + 'state/GetStateList';
    return this.http.post(getStateList_url, body)
      .map(response => response.json()['stateList']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  GetCityList(stateId): Observable<any> {
    var body = `${stateId}`;
    const getCityList_url = AppComponent.urlPath + 'city/GetCityList';
    return this.http.post(getCityList_url, body)
      .map(response => response.json()['cityList']).map(data => {

        if (data != '')
          return data;
        else
          return '';
      });
  }


  public uploadEmployerLogo(idToUpdate, encoded_img, sessionID, userID) {

    const params = new URLSearchParams();

    params.set('id', idToUpdate);
    params.set('img', encoded_img);
    params.set('sessionId', sessionID);
    params.set('logoFor', 'Employer');
    params.set('userId', userID);


    const local_registration_url = AppComponent.urlPath + 'employerRegistration/updateLogo';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }


}
