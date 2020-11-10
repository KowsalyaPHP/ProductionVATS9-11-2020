import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';

@Injectable()
export class RegistrationListService {

  constructor(private http: Http) { }



  public getEmployerDetilsData(id): Observable<any> {
    const getEmpData_url = AppComponent.urlPath + 'registrationList/GetEmpRegistrationDetails';
    const params = new URLSearchParams();

    params.set('id', id);

    return this.http.post(getEmpData_url, params)
      .map(response => response.json()['EmployerRegistrationDetails']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }


  public getRecruiterDetilsData(id): Observable<any> {
    const getRecData_url = AppComponent.urlPath + 'registrationList/GetRecRegistrationDetails';
    const params = new URLSearchParams();

    params.set('id', id);

    return this.http.post(getRecData_url, params)
      .map(response => response.json()['RecruiterRegistrationDetails']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }


  public addRecordToMNH(id): Observable<any> {
    const addDataToMNH_url = AppComponent.urlPath + 'registrationList/AddDataToMNH';
    const params = new URLSearchParams();
    params.set('id', id);

    return this.http.post(addDataToMNH_url, params)
      .map(response => response.json()['MNHRecord']).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }

  public deactivateRecordInMNH(id): Observable<any> {
    const deActivateRecMNH_url = AppComponent.urlPath + 'registrationList/DeactivateRecordInMNH';
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.post(deActivateRecMNH_url, params)
      .map(response => response.json()).map(data => {

        if (data != '')
          return data;
        else
          return '';
      });
  }

  public activateRecordInMNH(id): Observable<any> {
    const activateRecMNH_url = AppComponent.urlPath + 'registrationList/ActivateRecordInMNH';
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.post(activateRecMNH_url, params)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return '';
      });
  }


  public checkRecordExistInMNH(id): Observable<any> {
    const checkRecordExist_url = AppComponent.urlPath + 'registrationList/CheckRecordExistInMNH';
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.post(checkRecordExist_url, params)
      .map(response => response.json()['recordExist']).map(data => {

        if (data != '')
          return data;
        else
          return '';
      });
  }




}
