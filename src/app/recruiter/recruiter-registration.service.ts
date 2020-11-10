import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable()
export class RecruiterRegistrationService {

  constructor(private http: Http) { }



  public addRecruiterRegistration(recruiterFormObj: any) {
    const params = new URLSearchParams();
    params.set('company_name', recruiterFormObj.company_name);
    //   params.set('company_website', recruiterFormObj.company_website);
    //   params.set('company_address', recruiterFormObj.company_address);
    params.set('city', recruiterFormObj.city);
    params.set('team_size', recruiterFormObj.team_size);
    params.set('specialised_sector', recruiterFormObj.specialised_sector);
    //  params.set('registration_number', recruiterFormObj.registration_number);
    params.set('GST_number', recruiterFormObj.GST_number);
    params.set('owner_name', recruiterFormObj.owner_name);
    params.set('contact_number', recruiterFormObj.contact_number);
    params.set('email', recruiterFormObj.email);
    params.set('SPOC_name', recruiterFormObj.SPOC_name);
    params.set('SPOC_mobile_number', recruiterFormObj.SPOC_mobile_number);
    params.set('SPOC_email', recruiterFormObj.SPOC_email);
    params.set('password', recruiterFormObj.password);

    const local_registration_url = AppComponent.urlPath + 'recruiterRegistration/AddRecRegistration';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

  public showRecruiterRegistrationList(sessionID, userID) {
    const params = new URLSearchParams();
    params.set('uniqSessionID', sessionID);
    params.set('userID', userID);

    const local_registration_url = AppComponent.urlPath + 'recruiterRegistration/GetRecRegistration';
    return this.http.get(local_registration_url, { params }).map(response => response.json()['RegistrationDetails']).map(data => {
      if (data != '')
        return data;
      else
        return 'No data';
    });
  }

  public updateRecStatus(id, statusVal, emailid, sessionID, userID): Observable<any> {
    const params = new URLSearchParams();
    params.set('id', id);
    params.set('status', statusVal);
    params.set('emailid', emailid);
    params.set('sessionId', sessionID);
    params.set('userId', userID);

    const local_registration_url = AppComponent.urlPath + 'recruiterRegistration/ChangeStatus';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()['RegistrationDetails']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }


}
