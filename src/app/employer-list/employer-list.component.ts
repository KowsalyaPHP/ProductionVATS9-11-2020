import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployerListService } from '../../app/employer-list/employer-list.service';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { BUList, JobList, JobListRateCard } from '../models/bulist';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {
  regDataArr = [];
  clientList: BUList[] = [];
  openingJobList: JobList[] = [];
  openingJobListTemp: JobList[] = [];
  isData: boolean = false;
  sessionId: any;
  userID: any;
  usrtype: any;
  data: any;
  news_image: any;
  idToUpdate: any;
  isUploadLogo: boolean;
  cropperSettings: CropperSettings;
  clientAllObj: BUList[] = [{
    buId: 0,
    buName: "All",
    id: 0,
    logo_path: ""
  }];

  openingAllObj: JobList[] = [{
    buId: 0,
    openingId: 0,
    openTitle: "All"
  }]
  jobList: JobListRateCard[] = null;
  deleteRateCardItem: JobListRateCard;
  buId: number;
  buName: string;
  reqId: number;
  reqName: string;
  fromDate: Date;
  tillDate: Date;
  fixedShare: number = 0;
  bonusShare: number = 0;
  fixedShareUnit = "0";
  bonusShareUnit = "0";
  todayDate = new Date();
  deleteMessageRateCard: string;
  isDeletingRateCard: boolean = false;
  isSavingRateCard: boolean = false;
  public minDate = this.todayDate.toDateString();

  @ViewChild("openUploadImage") openUploadImage: ElementRef;
  @ViewChild("openAddShare") openAddShare: ElementRef;
  @ViewChild("closeAddShare") closeAddShare: ElementRef;
  @ViewChild("openDeleteShare") openDeleteShare: ElementRef;
  @ViewChild("closeDeleteShare") closeDeleteShare: ElementRef;



  constructor(private EmpListService: EmployerListService, private routerObj: Router, private _sanitizer: DomSanitizer, private toastr: ToastrService) {
    this.sessionId = sessionStorage.getItem('uniqueSessionId');
    this.userID = sessionStorage.getItem('userID');
    this.usrtype = sessionStorage.getItem('usertype');

    this.showEmployerList(this.sessionId, this.userID);
    this.getOpeningJobList(0);
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 140;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 330;
    this.cropperSettings.canvasHeight = 300;
    //this.cropperSettings.rounded = true; 
    this.data = {};
  }

  ngOnInit() {

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    $(document).ready(function () {
      $(this).scrollTop(0);
    });


    setTimeout(function () {
      $(function () {
        $('#employerTable').DataTable();
        var d = $('#jobListTable').DataTable();
      });
      //alert(this.isData);
    }, 1000);
  }

  showEmployerList(sessionID, userId) {
    this.EmpListService.showEmployerList(sessionID, userId).subscribe(
      response => {
        if (response != '') {
          if (response == 'Session MisMatch') {
            this.routerObj.navigate(['/login']);
          }
          else {
            this.regDataArr = response;
            this.clientList = response;
            this.clientList = this.clientAllObj.concat(this.clientList);
            // this.clientNameAutoCompleteGroup = [
            // CreateNewAutocompleteGroup(
            //   'Search / choose in / from list',
            //   'completer',
            //   this.regDataArr,
            //   { titleKey: 'buName', childrenKey: null }
            // ),
            // ];
          }
          //alert('Status changed');
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  uploadLogoEmp(id) {
    this.idToUpdate = id;
    // $('#uploadImage').modal('show');
    this.openUploadImage.nativeElement.click();
  }
  uploadImage() {
    if (this.idToUpdate != '') {
      var imgToUpload: any;
      var imgToSplit: any;
      imgToUpload = this.data.image;
      imgToSplit = imgToUpload.split(',');
      this.news_image = imgToSplit[1];

      this.EmpListService.uploadEmployerLogo(this.idToUpdate, this.news_image, this.sessionId, this.userID).subscribe(
        response => {
          if (response == 'Success') {
            alert('Logo Uploaded');
            this.showEmployerList(this.sessionId, this.userID);
          }
          else {
            alert('Error Occurd! Please Upload Logo!');
            console.log('something is wrong with Service Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }
    this.idToUpdate = '';
  }

  deleteLogoEmp(id) {
    this.idToUpdate = id;

    if (confirm("Are you sure, to delete this logo?")) {

      this.EmpListService.deleteEmployerLogo(this.idToUpdate).subscribe(
        response => {
          if (response == 'Success') {
            alert('Logo Deleted');
            this.showEmployerList(this.sessionId, this.userID);
          }
          else {
            alert('Error Occurd! Please Upload Logo!');
            console.log('something is wrong with Service Execution');
          }
        },
        error => console.log("Error Occurd!")
      );


    }
  }

  logout() {
    this.routerObj.navigate(['logout']);
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  addRateCard() {
    if (this.reqId > 0 || this.buId > 0) {
      this.openAddShare.nativeElement.click();
    }

    this.fromDate = null;
    this.tillDate = null;
    this.fixedShare = 0;
    this.bonusShare = 0;
    this.fixedShareUnit = "0";
    this.bonusShareUnit = "0";
    this.minDate = this.todayDate.toDateString();
    if (this.reqId > 0) {
      let val = this.openingJobList.find(x => x.openingId == this.reqId);
      if (val) {
        this.minDate = <any>val.createdDate;
      }
    }
    else {
      if (this.openingJobList.length > 0) {
        this.minDate = <any>this.openingJobList[this.openingJobList.length - 1].createdDate;
      }
    }
  }

  clientAutocompleListFormatter = (data: any): SafeHtml => {
    let html = `<span>${data.buName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  clientSelected(e) {
    let client: BUList = e;
    this.buId = client.buId;
    this.reqName = "";
    this.reqId = null;
    this.openingJobList = JSON.parse(JSON.stringify(this.openingJobListTemp));
    if (this.buId > 0) {
      this.openingJobList = this.openingJobList.filter(x => x.buId == this.buId);
      this.openingJobList = <any>this.openingAllObj.concat(this.openingJobList);
    }

  }

  jobAutocompleListFormatter = (data: any): SafeHtml => {
    let html = `<span>${data.openingId} - ${data.openTitle}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  jobSelected(e) {
    let job: JobList = e;
    this.reqId = job.openingId;
  }


  getOpeningJobList(buId) {
    this.EmpListService.getOpeningJobList(buId).subscribe(
      response => {
        if (response != '') {
          if (response == 'Session MisMatch') {
            this.routerObj.navigate(['/login']);
          }
          else {
            this.openingJobListTemp = response;
            this.openingJobList = JSON.parse(JSON.stringify(this.openingJobListTemp));
            this.openingJobList = <any>this.openingAllObj.concat(this.openingJobList);
          }
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  getJobList() {
    if (this.buId > 0 || this.reqId > 0) {
      this.EmpListService.getJObListWithRateCard(this.buId, this.reqId).subscribe(
        response => {
          if (response != '') {
            if (response == 'Session MisMatch') {
              this.routerObj.navigate(['/login']);
            }
            else {
              $('#jobListTable').DataTable().clear().draw();
              $('#jobListTable').DataTable().destroy();
              if (response == 'No data') {
                this.jobList = [];
              }
              else {
                let jobDetails: JobListRateCard[] = response;

                // jobDetails.forEach(item => {
                //   let jobs = jobDetails.filter(x => x.openingId == item.openingId);
                //   if (jobs.length > 1) {
                //     let idx = jobDetails.findIndex(x => x.id == jobs[jobs.length - 1].id && x.openingId == jobs[jobs.length - 1].openingId);
                //     jobDetails.splice(idx, 1);
                //   }
                // });

                this.jobList = jobDetails;

              }

              setTimeout(function () {
                $(function () {
                  $('#jobListTable').DataTable();
                });
              }, 1000);
            }
          }
          else {
            this.jobList = [];
            console.log('something is wrong with Service  Execution');
          }
        },
        error => {
          this.jobList = [];
        }
      );
    }
  }

  submitRateCard() {

    if (this.fromDate > this.tillDate) {
      alert("From date should be less than till date");
      return;
    }
    if (this.fixedShare <= 0) {
      alert("Fixed Share should be greater than 1");
      return;
    }

    if (this.fixedShareUnit == "0" && this.fixedShare > 100) {
      alert("Fixed Share should be less than 100%");
      return;
    }

    if (this.fixedShareUnit == "1" && this.fixedShare < 1) {
      alert("Fixed Share should not be less than ₹1");
      return;
    }

    if (this.bonusShare > 0 && this.fixedShareUnit != this.bonusShareUnit) {
      alert("Unit of Fixed and Bonus share should be same");
      return;
    }

    if (this.bonusShare > 0 && this.bonusShareUnit == "0" && this.bonusShare > 100) {
      alert("Bonus Share should be less than 100%");
      return;
    }

    // if ((!this.buId || !this.reqId) || (parseInt(<any>this.reqId, 10) <= 0 && parseInt(<any>this.buId, 10) <= 0)) {
    //   alert('Invalid job details');
    //   return;
    // }
    // let list = this.jobList.filter(x => x.openingId == this.reqId);
    // if (list && list.length > 0) {
    //   list.forEach(x => {
    //     if (this.fromDate >= new Date(x.fromDate) && this.fromDate <= new Date(x.tillDate)) {
    //       alert("Rate Card already exists for given date");
    //       return;
    //     }
    //     else if (this.tillDate >= new Date(x.fromDate) && this.tillDate <= new Date(x.tillDate)) {

    //       alert("Rate Card already exists for given date");
    //       return;
    //     }
    //   });
    // }

    let list = this.jobList.filter(x => x.openingId == this.reqId && ((this.fromDate >= new Date(x.fromDate) && this.fromDate <= new Date(x.tillDate)) || (this.tillDate >= new Date(x.fromDate) && this.tillDate <= new Date(x.tillDate))));
    if (list != null && list.length > 0) {
      alert("Rate Card already exists for given date");
      return;
    }

    this.isSavingRateCard = true;

    let data = {
      buId: this.buId,
      openingId: this.reqId,
      fromDate: this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate(),
      tillDate: this.tillDate.getFullYear() + "-" + (this.tillDate.getMonth() + 1) + "-" + this.tillDate.getDate(),
      fixedShare: this.fixedShareUnit == "0" ? 0 : this.fixedShare,
      fixedShareInPerc: this.fixedShareUnit == "1" ? 0 : this.fixedShare,
      bonusShare: this.bonusShareUnit == "0" ? 0 : this.bonusShare,
      bonusShareInPerc: this.bonusShareUnit == "1" ? 0 : this.bonusShare,
      createdBy: this.userID
    };


    this.EmpListService.insertRateCard(data).subscribe(
      res => {
        this.isSavingRateCard = false;
        this.toastr.success("Rate has been added successfully");
        this.fromDate = null;
        this.tillDate = null;
        this.fixedShare = 0;
        this.bonusShare = 0;
        this.fixedShareUnit = "0";
        this.bonusShareUnit = "0";
        this.jobList = null;
        this.getJobList();
        this.closeAddShare.nativeElement.click();
      },
      error => {
        this.toastr.success("Something went wrong. Please try again");
        this.isSavingRateCard = false;
      }
    );
  }

  clearReqName() {
    this.reqId = null;
    this.reqName = "";
  }

  clearBUName() {
    this.buId = null;
    this.buName = "";
    this.clearReqName();
    this.openingJobList = [];
  }

  deleteRateCard(item: JobListRateCard) {
    this.deleteRateCardItem = item;

    if (item.rcOpeningId > 0) {
      this.deleteMessageRateCard = "Are you sure you want to delete this rate?"
    }
    else {
      this.deleteMessageRateCard = "This rate card associated with Client. Are you sure you want to delete this rate?"
    }
    this.openDeleteShare.nativeElement.click();
  }

  deleteRateCardConfirm() {
    this.isDeletingRateCard = true;
    this.EmpListService.deleteRateCard(this.deleteRateCardItem.id).subscribe(res => {
      this.isDeletingRateCard = false;
      this.deleteRateCardItem = null;
      this.closeDeleteShare.nativeElement.click();
      this.toastr.success("Rate has been deleted successfully");
      this.getJobList();
    },
      error => {
        this.toastr.error(error);
        this.isDeletingRateCard = false;
      })
  }

  deleteRateCardCancel() {
    this.deleteRateCardItem = null;
  }


}

