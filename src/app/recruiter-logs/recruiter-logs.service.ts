import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { AppComponent } from "../app.component";

@Injectable()
export class RecruiterLogsService {
  constructor(private http: Http) { }

  public getjobList(): Observable<any> {
    const getEmpData_url =
      AppComponent.urlPath + "jobDetails/RecruiterJobDetails/joblist";

    return this.http
      .get(getEmpData_url)
      .map(response => response.json()["jobList"])
      .map(data => {

        if (data != "") return data;
        else return "";
      });
  }

  public getRecruiterLogList(): Observable<any> {
    const getEmpData_url =
      AppComponent.urlPath + "jobDetails/RecruiterJobDetails/recruiterloglist";

    return this.http
      .get(getEmpData_url)
      .map(response => response.json()["recruiterLogList"])
      .map(data => {

        if (data != "") return data;
        else return "";
      });
  }
  public updateJobMaxCount(data): Observable<any> {
    const getEmpData_url =
      AppComponent.urlPath + "jobDetails/RecruiterJobDetails/updateJobMaxCount";

    return this.http
      .post(getEmpData_url, data)
      .map(response => response.json())
      .map(data => {

        if (data != "") return data;
        else return "";
      });
  }
  public updateRecruiterMaxCount(data): Observable<any> {
    const getEmpData_url =
      AppComponent.urlPath +
      "jobDetails/RecruiterJobDetails/updateRecruiterMaxCount";

    return this.http
      .post(getEmpData_url, data)
      .map(response => response.json())
      .map(data => {

        if (data != "") return data;
        else return "";
      });
  }
}
