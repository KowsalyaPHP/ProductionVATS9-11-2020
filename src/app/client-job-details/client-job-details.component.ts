import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientJobDetailsService } from './client-job-details.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FooterComponent } from '../frontend-pages/footer/footer.component';
import { LoginService } from '../login/login.service'
declare const $: any;
import { AppComponent } from '../app.component';
import { Pipeline } from '../models/pipeline';

@Component({
  selector: 'app-client-job-details',
  templateUrl: './client-job-details.component.html',
  styleUrls: ['./client-job-details.component.css']
})
export class ClientJobDetailsComponent implements OnInit {


  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  dispVar: any = "none";
  sessionID: any;
  userID: any;
  forgotPwdmail: any;
  usrtype: any;
  usernm: any;
  vendorPipelineCount: Pipeline[] = [];
  pipelineCount: Pipeline;

  company_name: any;
  jobDtlsArr = [];

  showComment: any;
  showTitle: any;
  //Array to display filters in leftnav
  companyFilter = [];
  localityFilter = [];
  jobTypefilter = [];
  salaryFilter = [];
  careerStreamfilter = [];
  hotJobFilter = [];

  //Arrays  for multifitering
  datasets = {};
  fieldNameFilter = [];
  fieldValueFilter = [];

  multiJobTypeFilter = [];
  multiCompanyFilter = [];
  multiLocalityFilter = [];
  multiSalaryFilter = [];
  multicareerStreamfilter = [];
  multiHotjobfilter = [];
  multijobCatfilter = [];
  filterByValue;
  filterCriteria;
  reqIdFilter = [];

  salvalmin: any;
  salvalmax: any;

  loggedIn: boolean;
  reqid: any;

  checkFilterComp = [];
  checkFilterStream = [];
  checkFilterHotJob: any;
  chkHotJob: any;

  collapseClsLacality = 'panel-collapse collapse';
  collapseClsComp = "panel-collapse collapse";
  collapseClsReqId = "panel-collapse collapse in"
  collapseClsStream = "panel-collapse collapse";
  collapseClsHotJobs = "panel-collapse collapse";

  constructor(private routerObj: Router, public jobDetailServiceObj: ClientJobDetailsService, private formBuilderObj: FormBuilder, private loginService: LoginService, private route: ActivatedRoute) {

    this.loginForm = this.formBuilderObj.group({
      username: '',
      password: '',
    });

    this.forgotPasswordForm = this.formBuilderObj.group({
      forgotPasswordmail: '',
      loginType: ''
    });

    this.loggedIn = false;
    //debugger
    this.filterByValue = sessionStorage.getItem('filterByValue');
    this.filterCriteria = sessionStorage.getItem('filterCriteria');
    this.usrtype = sessionStorage.getItem('usertype');
    this.chkHotJob = '';

    this.usernm = sessionStorage.getItem('username');

    if (typeof this.usernm !== 'undefined' && this.usernm !== null) {
      this.loggedIn = true;
    }

    if (typeof this.filterByValue !== 'undefined' && this.filterByValue !== null) {
      this.collapseClsLacality = "panel-collapse collapse";

      if (this.filterCriteria == 'openingId')
        this.collapseClsReqId = 'panel-collapse collapse in';

      if (this.filterCriteria == 'compnyname')
        this.collapseClsComp = 'panel-collapse collapse in';

      if (this.filterCriteria == 'crStreamName')
        this.collapseClsStream = 'panel-collapse collapse in';

      if (this.filterCriteria == 'hotJobs') {
        this.collapseClsHotJobs = 'panel-collapse collapse in';
        this.chkHotJob = 'checked';
      }
      else
        this.collapseClsHotJobs = 'panel-collapse collapse';

      if (this.filterCriteria == 'JobCategory') {
        this.collapseClsHotJobs = 'panel-collapse collapse in';
        this.chkHotJob = 'checked';
      }


      this.createFilterData(this.filterByValue, true, this.filterCriteria);
    }
    else {
      this.getJobDetails();
    }
  }

  ngOnInit() {
    this.getVendorPipelineCount();
    $('#back-to-top').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });
    window.scrollTo(0, 0);

    $(document).ready(function () {
      $(this).scrollTop(0);
    });

    setTimeout(function () {
      $(".mybuttonrtr").hover(function () {
        $('.top-offers').modal({
          show: true,
          backdrop: true
        })
      });
    }, 1000);


    ///////////////////////////
    // Btn nav collapse
    setTimeout(function () {
      $('#nav .nav-collapse').on('click', function () {
        $('#nav').toggleClass('open');
      });
    }, 1000);

    setTimeout(function () {
      $('.has-dropdown a').on('click', function () {
        $(this).parent().toggleClass('open-drop');
      });

    }, 1000);

    setTimeout(function () {
      $('[data-toggle="popover"]').popover()
    }, 1000);

    $('body').on('click', function (e) {
      //did not click a popover toggle or popover
      if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) {
        $('[data-toggle="popover"]').popover('hide');
      }
    });

    //If enterd reqid for search and press "enter" to search then below code will execute
    $('#reqId').keypress(function (e) {
      var key = e.which;
      if (key == 13)  // the enter key code
      {
        $('#reqIdSearch').click();
      }
    });

    this.forgotPasswordForm = new FormGroup({
      'forgotPasswordmail': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]),
      'loginType': new FormControl('', [Validators.required])
    });

  }

  get forgotPasswordmail() { return this.forgotPasswordForm.get('forgotPasswordmail'); }
  get loginType() { return this.forgotPasswordForm.get('loginType'); }


  getJobDetails() {
    $("#loader").css("display", "block");

    let userID = sessionStorage.getItem('userID');

    this.jobDetailServiceObj.getJobsDetail().subscribe(
      response => {
        if (response != '') {
          $("#loader").css("display", "none")
          this.jobDtlsArr = response;
          if (this.jobDtlsArr.length == 0)
            $("#NojobFound").css("display", "block")
          else
            $("#NojobFound").css("display", "none")

          // this.companyFilter = response['companyFilter'];
          // this.localityFilter = response['localityfilter'];
          // this.jobTypefilter = response['jobTypefilter'];
          // this.salaryFilter = response['salaryfilter'];
          // this.careerStreamfilter = response['careerStreamfilter'];
          // this.hotJobFilter = response['hotJobFilter'];

          // this.salvalmin = this.salaryFilter[0]['ctcBandLowEnd'];
          // this.salvalmax = this.salaryFilter[0]['ctcBandHighEnd'];

          this.createSalSlider();
        }
        else {
          $("#loader").css("display", "none")
          console.log('something is wrong with Service Execution');
        }
      },
      error => console.log("Error Occurd!")
    );


  }
  createSalSlider() {
    let addVal = Math.ceil((parseInt(this.salvalmax) + parseInt(this.salvalmin)) / 2);
    let fromval = addVal;

    // let fromval = parseInt(this.salvalmin) + addVal;
    // let toval = fromval + addVal ;

    $("#range_01").ionRangeSlider({
      type: "double",
      min: this.salvalmin,
      max: this.salvalmax,
      from: fromval,
      to: this.salvalmax,
      step: 100,
      to_fixed: true,
      onFinish: function (data) {
        this.salvalmin = data['from'];
        this.salvalmax = data['to'];
        $("#salvalmin").val(data['from']);
        $("#salvalmax").val(data['to']);
        $("#salvalmin").focus();
      }
    });
  }

  searchByFilter(filterValue, e, fieldNm) {
    if (e.target.checked) {
      this.createFilterData(filterValue, true, fieldNm);
    }
    else {
      this.createFilterData(filterValue, false, fieldNm);
    }
  }


  createFilterData(filterValue, boolVal, fieldNm) {
    //debugger
    if (filterValue == 'searchSalary') {
      filterValue = $("#salvalmin").val();
    }


    if (boolVal == true) {

      this.fieldNameFilter.push(fieldNm);
      this.fieldNameFilter = this.removeDuplicates(this.fieldNameFilter);
      this.fieldValueFilter.push(filterValue);


      if (fieldNm == 'openingId') {
        var arrayvals = [];
        this.reqIdFilter = [];
        this.reqIdFilter.push(filterValue);
        arrayvals = this.reqIdFilter;
      }

      if (fieldNm == 'compnyname') {
        var arrayvals = [];
        this.multiCompanyFilter.push(filterValue);
        arrayvals = this.multiCompanyFilter;
      }

      if (fieldNm == 'employmentType') {
        var arrayvals = [];
        this.multiJobTypeFilter.push(filterValue);
        arrayvals = this.multiJobTypeFilter;
      }

      if (fieldNm == 'address') {
        var arrayvals = [];
        this.multiLocalityFilter.push(filterValue);
        arrayvals = this.multiLocalityFilter;
      }

      if (fieldNm == 'ctcBandLowEnd') {
        var arrayvals = [];
        this.multiSalaryFilter = [];
        this.multiSalaryFilter.push(filterValue);
        arrayvals = this.multiSalaryFilter;
      }

      if (fieldNm == 'crStreamName') {
        var arrayvals = [];
        this.multicareerStreamfilter.push(filterValue);
        arrayvals = this.multicareerStreamfilter;
      }

      if (fieldNm == 'hotJobs') {
        var arrayvals = [];
        this.multiHotjobfilter.push(filterValue);
        arrayvals = this.multiHotjobfilter;
      }


      if (fieldNm == 'JobCategory') {
        var arrayvals = [];
        this.multijobCatfilter.push(filterValue);
        arrayvals = this.multijobCatfilter;
      }

      this.datasets[fieldNm] = { data: arrayvals };
    } else {

      if (this.chkHotJob == 'checked' && filterValue == 'Hot Job') {      // if comes from home page then fieldNm will be hotJobs otherwise fieldNm will be jobcat.
        fieldNm = sessionStorage.getItem('fieldSet');
        this.chkHotJob = '';
        sessionStorage.removeItem('fieldSet');
      }

      let indexd = this.datasets[fieldNm]['data'].indexOf(filterValue);
      this.datasets[fieldNm]['data'].splice(indexd, 1);

      if (this.datasets[fieldNm]['data'].length == 0) {
        delete this.datasets[fieldNm];

        let indexs = this.fieldNameFilter.indexOf(fieldNm);
        this.fieldNameFilter.splice(indexs, 1);
      }
    }

    if (fieldNm == 'compnyname') {  //this.filterCriteria
      this.checkFilterComp = [];
      if (typeof this.datasets[fieldNm] !== 'undefined' && this.datasets[fieldNm] !== null) {
        for (let val = 0; val < this.datasets[fieldNm]['data'].length; val++)
          this.checkFilterComp.push(({ 'id': this.datasets[fieldNm]['data'][val] }));
      }

    }

    if (fieldNm == 'crStreamName') {  //this.filterCriteria
      this.checkFilterStream = [];
      if (typeof this.datasets[fieldNm] !== 'undefined' && this.datasets[fieldNm] !== null) {
        for (let val = 0; val < this.datasets[fieldNm]['data'].length; val++)
          this.checkFilterStream.push(({ 'id': this.datasets[fieldNm]['data'][val] }));
      }
    }

    setTimeout(() => {


      if (this.multiLocalityFilter.length != 0) {
        $('#localityClear').show();
        $('#localityClearDot').show();
      }
      else {
        $('#localityClear').hide();
        $('#localityClearDot').hide();
      }

      if (this.multiJobTypeFilter.length != 0) {
        $('#jobTypeClear').show();
        $('#jobTypeClearDot').show();
      }
      else {
        $('#jobTypeClear').hide();
        $('#jobTypeClearDot').hide();
      }

      if (this.multiSalaryFilter.length != 0) {
        $('#salaryClear').show();
        $('#salaryClearDot').show();
      }
      else {
        $('#salaryClear').hide();
        $('#salaryClearDot').hide();
      }

      if (this.reqIdFilter.length != 0) {
        $('#reqIdClear').show();
        $('#reqIdClearDot').show();
      }
      else {
        $('#reqIdClear').hide();
        $('#reqIdClearDot').hide();
      }

      if (this.multiCompanyFilter.length != 0) {
        $('#compnynameClear').show();
        $('#compnynameClearDot').show();
      }
      else {
        $('#compnynameClear').hide();
        $('#compnynameClearDot').hide();
      }

      if (this.multicareerStreamfilter.length != 0) {
        $('#crStreamClear').show();
        $('#crStreamClearDot').show();
      }
      else {
        $('#crStreamClear').hide();
        $('#crStreamClearDot').hide();
      }

      //  if(this.multiHotjobfilter.length != 0){
      //  $('#jobCatClear').show();
      //  $('#jobCatClearDot').show();

      // }
      //  else{
      //  $('#jobCatClear').hide();
      //  $('#jobCatClearDot').hide();
      // }

      if (this.multijobCatfilter.length != 0 || this.multiHotjobfilter.length != 0) {
        $('#jobCatClear').show();
        $('#jobCatClearDot').show();
      }
      else {
        $('#jobCatClear').hide();
        $('#jobCatClearDot').hide();
      }

    }, 1000);

  }

  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array;
  }

  check(value1, value2) {
    if (value1.length > 0) {
      return (value1.filter(item => item.id == value2)).length
    }
  }

  clearFilter(fieldNm) {
    delete this.datasets[fieldNm];
    let indexs = this.fieldNameFilter.indexOf(fieldNm);
    this.fieldNameFilter.splice(indexs, 1);

    if (fieldNm == 'address') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#collapseOne').find('input[type=checkbox]:checked').removeAttr('checked');
      $('#localityClear').hide();
      $('#localityClearDot').hide();
      this.multiLocalityFilter = [];
    }

    if (fieldNm == 'ctcBandLowEnd') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#salvalmin').val(0);
      $('#salaryClear').hide();
      $('#salaryClearDot').hide();
      this.multiSalaryFilter = [];
    }


    if (fieldNm == 'employmentType') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#collapsefour').find('input[type=checkbox]:checked').removeAttr('checked');
      $('#jobTypeClear').hide();
      $('#jobTypeClearDot').hide();
      this.multiJobTypeFilter = [];
    }

    if (fieldNm == 'openingId') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#reqId').val('');
      $('#reqIdClear').hide();
      $('#reqIdClearDot').hide();
      this.reqIdFilter = [];
    }

    if (fieldNm == 'compnyname') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#collapsefive').find('input[type=checkbox]:checked').removeAttr('checked');
      $('#compnynameClear').hide();
      $('#compnynameClearDot').hide();
      this.multiCompanyFilter = [];
    }

    if (fieldNm == 'crStreamName') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#collapsesix').find('input[type=checkbox]:checked').removeAttr('checked');
      $('#crStreamClear').hide();
      $('#crStreamClearDot').hide();
      this.multicareerStreamfilter = [];
    }

    if (fieldNm == 'hotJobs') { // "collapseOne" div-id used to show locality filter,below line will uncheck all check boxes in the collapseone die - ie - in loacality div.
      $('#collapseseven').find('input[type=checkbox]:checked').removeAttr('checked');
      $('#jobCatClear').hide();
      $('#jobCatClearDot').hide();
      this.multiHotjobfilter = [];
      this.multijobCatfilter = [];
    }


  }

  redirectToMNH(reqid) {
    var username = sessionStorage.getItem('username');
    var userType = sessionStorage.getItem('usertype');
    var userpwd = sessionStorage.getItem('userpwd');
    if (typeof username !== 'undefined' && username !== null && userType == 'Vendor') {
      this.jobDetailServiceObj.getEncodedStr(reqid, username, userpwd).subscribe(
        response => {
          if (response != '') {
            var paramStr = btoa(response);           //btoa() used to convert Json to base64

            var redirectLink = "https://emagine.mynexthire.com/employer/jobs?src=partner&p=" + paramStr;

            var win = window.open(redirectLink, '_blank');
            if (win) {
              win.focus();
            } else {
              alert('Please allow popups for this website');
            }
          }
          else {
            console.log('something is wrong with Service Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    } else {
      this.routerObj.navigate(['/login']);
    }

  }

  employerRegistration() {
    // $('#loginModel').modal('hide');
    this.routerObj.navigate(['/employer']);
  }
  recruiterRegistration() {
    // $('#loginModel').modal('hide');
    this.routerObj.navigate(['/recruiter']);
  }

  ShowComment(comnt, title) {
    this.showComment = comnt;
    this.showTitle = title;
  }

  SendForgotPasswordMail(forgotPwdformObj) {

    this.loginService.sendForgotPwdDetail(forgotPwdformObj).subscribe(
      response => {
        if (response != 'No data' && response != '') {
          this.forgotPasswordForm.reset();
          alert("Mail Sent");
          // $('#ForgotPassword').modal('hide');
        }
        else {
          alert("Entered MailId is not available in System!");
          console.log('Entered MailId is not available in System!');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  redirectToDashboard() {
    let username = sessionStorage.getItem('username');
    let userType = sessionStorage.getItem('usertype');
    let userpwd = sessionStorage.getItem('userpwd');

    if (typeof username !== 'undefined' && username !== null && userType == 'Vendor') {

      let param = {
        "pageType": "list",
        "cvSource": "partner",
        "reqId": 0,
        "requester": {
          "id": username,
          "code": userpwd,
          "name": ""
        }
      };

      let objJsonStr = JSON.stringify(param);
      let p = btoa(objJsonStr);
      var redirectLink = "https://emagine.mynexthire.com/employer/jobs?src=partner&p=" + p;
      var win = window.open(redirectLink, '_blank');
      if (win) {
        win.focus();
      } else {
        alert('Please allow popups for this website');
      }
    } else {
      // $('#loginModel').modal('show');

    }
  }

  getVendorPipelineCount() {
    this.userID = sessionStorage.getItem('userID');
    this.jobDetailServiceObj.getPipelineDetailByVendor(this.userID).subscribe(res => {
      this.vendorPipelineCount = res;
    },
      error => {
        this.vendorPipelineCount = [];
      });
  }

  getCountByOpeningId(openingId, type) {
    if (this.vendorPipelineCount && this.vendorPipelineCount.length > 0) {
      this.pipelineCount = this.vendorPipelineCount.find(x => x.openingId == openingId);
    }
    if (this.pipelineCount && this.pipelineCount[type])
      return this.pipelineCount[type];
    else
      return 0;
  }

  getTotalCountByOpeningId(openingId) {
    if (this.vendorPipelineCount && this.vendorPipelineCount.length > 0) {
      this.pipelineCount = this.vendorPipelineCount.find(x => x.openingId == openingId);
    }
    if (this.pipelineCount)
      return this.pipelineCount.sourcing_count + this.pipelineCount.screening_count + this.pipelineCount.assessment_count + this.pipelineCount.negotiation_count + this.pipelineCount.offered_count + this.pipelineCount.joined_count + this.pipelineCount.exit_count;
    else
      return 0;
  }


  getTotalCount(c1: number, c2: number, c3: number, c4: number, c5: number, c6: number) {
    let val: number = Number(c1) + Number(c2) + Number(c3) + Number(c4) + Number(c5) + Number(c6);
    return val;
  }
}

