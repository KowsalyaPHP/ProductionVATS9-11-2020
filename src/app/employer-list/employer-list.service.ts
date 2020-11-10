import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable()
export class EmployerListService {

  constructor(private http: Http) { }

  public showEmployerList(sessionID, userID) {
    const params = new URLSearchParams();
    params.set('uniqSessionID', sessionID);
    params.set('userID', userID);

    const local_registration_url = AppComponent.urlPath + 'employerList/GetEmployerList';
    return this.http.get(local_registration_url, { params }).map(response => response.json()['RegistrationDetails']).map(data => {

      if (data != '')
        return data;
      else
        return 'No data';
    });
  }

  public uploadEmployerLogo(idToUpdate, encoded_img, sessionID, userID) {
    const params = new URLSearchParams();
    params.set('id', idToUpdate);
    params.set('img', encoded_img);
    params.set('sessionId', sessionID);
    params.set('logoFor', 'Employer');
    params.set('userId', userID);
    const local_registration_url = AppComponent.urlPath + 'employerList/UpdateLogo';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

  public deleteEmployerLogo(idToUpdate) {

    const params = new URLSearchParams();
    params.set('id', idToUpdate);
    params.set('logoFor', 'Employer');

    const local_registration_url = AppComponent.urlPath + 'employerList/DeleteLogo';
    return this.http.post(local_registration_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

  public getOpeningJobList($buId) {
    const params = new URLSearchParams();
    params.set('buId', $buId);

    const url = AppComponent.urlPath + 'jobDetails/GetJobDetails/getOpeningJobsByBuId';
    return this.http.get(url, { params }).map(response => response.json()['job_list']).map(data => {

      if (data != '')
        return data;
      else
        return 'No data';
    });
  }


  public getJObListWithRateCard($buId, $openingId) {
    const params = new URLSearchParams();
    params.set('buId', $buId);
    params.set('openingId', $openingId);

    const url = AppComponent.urlPath + 'jobDetails/GetJobDetails/getJobListWitRateCard';
    return this.http.get(url, { params }).map(response => response.json()['job_list']).map(data => {

      if (data != '')
        return data;
      else
        return 'No data';
    });
  }

  public insertRateCard(data): Observable<any> {
    const getEmpData_url =
      AppComponent.urlPath +
      "jobDetails/RecruiterJobDetails/insertRateCardForVendor";

    return this.http
      .post(getEmpData_url, data)
      .map(response => response.json())
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public deleteRateCard(id): Observable<any> {
    const getEmpData_url =
      AppComponent.urlPath +
      "jobDetails/RecruiterJobDetails/deleteRateCardForVendor?id=" + id;

    return this.http
      .get(getEmpData_url)
      .map(response => response.json())
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

}
