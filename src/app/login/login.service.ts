import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component'

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  public validateLoginDetail(loginFormObj: any) {
    const params = new URLSearchParams();
    params.set('username', loginFormObj.username);
    params.set('password', loginFormObj.password);
    params.set('loginAs', loginFormObj.loginAs);

    const login_url = AppComponent.urlPath + 'login/GetLogin';
    return this.http.post(login_url, params)
      .map(response => response.json()['LoginDetails']).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

  public sendForgotPwdDetail(forgotPwdformObj: any): Observable<any> {
    const params = new URLSearchParams();

    params.set('forgotPasswordmail', forgotPwdformObj.forgotPasswordmail);
    params.set('loginType', forgotPwdformObj.loginType);

    const login_url = AppComponent.urlPath + 'login/ForgotPassword';
    return this.http.post(login_url, params)
      .map(response => response.json()['ForgotPwdDetails']).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }

  public getCurrentRateCard() {

    const ratecard_url = AppComponent.urlPath + 'rateCard/getCurrentRateCard';
    return this.http.get(ratecard_url)
      .map(response => response.json()).map(data => {
        if (data != '')
          return data;
        else
          return 'No data';
      });
  }


}
