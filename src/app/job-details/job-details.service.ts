import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Rx";
import { AppComponent } from "../app.component";

@Injectable()
export class JobDetailsService {
  datafilter = [];
  constructor(private http: Http) { }

  public getJobsDetail(): Observable<any> {
    const getHomeDetails_url =
      AppComponent.urlPath + "jobDetails/GetJobDetails";
    return this.http
      .get(getHomeDetails_url)
      .map(response => response.json()["jobDetails"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public getFilteredJobsDetail(dataarr, fieldArr): Observable<any> {
    const params = new URLSearchParams();
    var str = "";
    var strJoined = "";

    for (var h = 0; h < fieldArr.length; h++) {
      str = "";
      var fnm = fieldArr[h];
      for (var y = 0; y < dataarr[fnm]["data"].length; y++) {
        str += dataarr[fnm]["data"][y] + ",";
      }
      strJoined = str.slice(0, -1);
      params.set(fnm, strJoined);
    }

    params.set("fieldArr", fieldArr);

    const getHomeDetails_url =
      AppComponent.urlPath + "jobDetails/GetFilteredJobDetails";
    return this.http
      .post(getHomeDetails_url, params)
      .map(response => response.json()["jobDetails"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public getEncodedStr(reqid, username, userpwd): Observable<any> {
    const getEncodedStr_url =
      AppComponent.urlPath + "jobDetails/GetEncodedString";
    const params = new URLSearchParams();
    params.set("reqid", reqid);
    params.set("username", username);
    params.set("userpwd", userpwd);

    return this.http
      .post(getEncodedStr_url, params)
      .map(response => response.json()["encodedStr"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public getJobTypes(): Observable<any> {
    const getJobTypes_url = AppComponent.urlPath + "jobDetails/GetJobTypes";
    return this.http
      .get(getJobTypes_url)
      .map(response => response.json()["jobTypes"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public saveJobCategoryDetails(
    jobId,
    jobTypeId,
    startDate,
    endDate,
    txtComment,
    txtTitle
  ): Observable<any> {
    const saveJobCategoryDetails_url =
      AppComponent.urlPath + "jobDetails/SaveJobCategoryDetails";
    const params = new URLSearchParams();

    params.set("jobid", jobId);
    params.set("jobtype", jobTypeId);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("txtComment", txtComment);
    params.set("txtTitle", txtTitle);

    return this.http
      .post(saveJobCategoryDetails_url, params)
      .map(response => response.json()["JobCategoryDtl"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public getJobCategoryDetails(jobId, jobtypeId): Observable<any> {
    const getJobCategoryDetails_url =
      AppComponent.urlPath + "jobDetails/GetJobCategoryDetails";
    const params = new URLSearchParams();

    params.set("jobid", jobId);
    params.set("jobtypeIdVal", jobtypeId);

    return this.http
      .post(getJobCategoryDetails_url, params)
      .map(response => response.json()["JobCategoryRecord"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public deleteJobCategory(jobid, jobTypeId): Observable<any> {
    const deleteJobCategoryDetails_url =
      AppComponent.urlPath + "jobDetails/DeleteJobCategoryDetails";
    const params = new URLSearchParams();

    params.set("jobid", jobid);
    params.set("jobTypeId", jobTypeId);

    return this.http
      .post(deleteJobCategoryDetails_url, params)
      .map(response => response.json()["deleteJobCategory"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public getCategoryLogsData(): Observable<any> {
    const categoryLogs_url =
      AppComponent.urlPath + "jobDetails/GetJobCategoryLogs";
    return this.http
      .get(categoryLogs_url)
      .map(response => response.json()["categoryLogs"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }

  public getPipelineDetailByVendor(vendorId): Observable<any> {
    const getHomeDetails_url =
      AppComponent.urlPath + "jobDetails/GetJobDetails/vendorPipeline?vendorId=" + vendorId;
    return this.http
      .get(getHomeDetails_url)
      .map(response => response.json()["vendor_pipeline"])
      .map(data => {
        if (data != "") return data;
        else return "";
      });
  }
}
