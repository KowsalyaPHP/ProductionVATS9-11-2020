import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client } from '../models/client';
import { ClientListService } from './client-list.service';
import { Router } from '@angular/router';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clientList: Client[] = [];
  client: Client;
  jobList: any;
  sessionId: any;
  userID: any;
  usrtype: any;
  usernm: any;

  @ViewChild("openShowMoreClientModal") openShowMoreClientModal: ElementRef;

  constructor(private clientListService: ClientListService, private routerObj: Router) {
    this.sessionId = sessionStorage.getItem('uniqueSessionId');
    this.userID = sessionStorage.getItem('userID');
    this.usrtype = sessionStorage.getItem('usertype');

  }


  ngOnInit() {
    this.getClientList();
    this.getJobList();
    setTimeout(function () {
      $(function () {
        $('#clientTable').DataTable();
        $('#jobTable').DataTable();
      });
      //alert(this.isData);
    }, 1000);
  }

  getClientList() {
    this.clientListService.getClientList(this.sessionId, this.userID).subscribe(data => {
      if (data == <any>"Session MisMatch") {
        this.routerObj.navigate(['/login']);
      }
      this.clientList = <any>data;
    },
      error => {
        this.clientList = [];
      })
  }

  getJobList() {
    this.clientListService.getJobsDetail().subscribe(data => {
      this.jobList = <any>data;
      $(function () {
        $('#jobTable').DataTable();
      });
    },
      error => {
        this.jobList = [];
      })
  }

  showMoreClientDet(item) {
    this.client = item;
    this.openShowMoreClientModal.nativeElement.click();
  }
  downloadFile() {
    let data = this.clientList;
    const replacer = (key, value) => value === null ? "" : value; // specify how you want to handle null values here
    let headerTitle = ['id', 'firstname', 'lastname', 'companyname', 'company_website', 'company_address', 'city', 'state', 'country', 'pincode', 'contact_number', 'mobile_number', 'email', 'SPOC_name', 'SPOC_mobile_number', 'SPOC_email', 'industry', 'employee_number', 'password', 'status', 'employer_type'];
    const header = headerTitle;
    let fileHeader = ['id', 'firstname', 'lastname', 'companyname', 'company_website', 'company_address', 'city', 'state', 'country', 'pincode', 'contact_number', 'mobile_number', 'email', 'SPOC_name', 'SPOC_mobile_number', 'SPOC_email', 'industry', 'employee_number', 'password', 'status', 'employer_type'];
    let csv = data.map(row => header.map(fieldName => row[fieldName]).join(','));
    csv.unshift(fileHeader.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' });
    let fileName = "ClientDetails";
    fileName = fileName + ".csv";
    saveAs(blob, fileName);
  }

  logout() {
    this.routerObj.navigate(['logout']);
  }

}
