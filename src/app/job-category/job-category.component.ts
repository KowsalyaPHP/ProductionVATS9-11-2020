import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobDetailsService } from '../job-details/job-details.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

declare const $: any;
import { AppComponent } from '../app.component';
import { validateConfig } from '@angular/router/src/config';
@Component({
  selector: 'app-job-category',
  templateUrl: './job-category.component.html',
  styleUrls: ['./job-category.component.css']
})
export class JobCategoryComponent implements OnInit {
  model;        //For datepicker
  company_name: any;
  jobDtlsArr = [];
  jobTypesArr = [];
  jobid: any;
  usrtype: any;
  usernm: any;
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
  jobCategoryForm: FormGroup;
  date_invalid: string;

  jobTypeSelected: any;
  startDtSelected: any;
  endDateSelected: any;
  commentSelected: any;
  titleSelected: any;

  @ViewChild("openJobCategoryModel") openJobCategoryModel: ElementRef;

  constructor(private routerObj: Router, public jobDetailServiceObj: JobDetailsService, private formBuilderObj: FormBuilder, private route: ActivatedRoute) {

    this.jobCategoryForm = this.formBuilderObj.group({
      selJobType: '',
      startDate: '',
      endDate: '',
      txtComment: '',
      txtTitle: ''
    });


    this.loggedIn = false;
    //debugger
    this.filterByValue = sessionStorage.getItem('filterByValue');
    this.filterCriteria = sessionStorage.getItem('filterCriteria');
    this.usrtype = sessionStorage.getItem('usertype');
    this.usernm = sessionStorage.getItem('username');

    if (typeof this.usernm !== 'undefined' && this.usernm !== null) {
      this.loggedIn = true;
    }

    if (typeof this.filterByValue !== 'undefined' && this.filterByValue !== null) {
      this.createFilterData(this.filterByValue, true, this.filterCriteria);
    }
    else {
      this.getJobDetails();
    }

    this.getJobTypes();      // To get all active job types, to display in drop down

  }

  ngOnInit() {
    this.jobCategoryForm = new FormGroup({
      'selJobType': new FormControl('', [Validators.required]),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('', [Validators.required]),
      'txtComment': new FormControl(),
      'txtTitle': new FormControl()
    });

    setTimeout(function () {
      $(".mybuttonrtr").hover(function () {
        $('.top-offers').modal({
          show: true,
          backdrop: true
        })
      });
    }, 1000);

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    $(document).ready(function () {
      $(this).scrollTop(0);
    });

    $('#back-to-top').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });
    window.scrollTo(0, 0);

    setTimeout(function () {
      $('.has-dropdown a').on('click', function () {
        $(this).parent().toggleClass('open-drop');
      });

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

  }

  get selJobType() { return this.jobCategoryForm.get('selJobType'); }
  get startDate() { return this.jobCategoryForm.get('startDate'); }
  get endDate() { return this.jobCategoryForm.get('endDate'); }

  getJobTypes() {

    this.jobDetailServiceObj.getJobTypes().subscribe(
      response => {
        if (response != '') {
          this.jobTypesArr = response;
        }
        else {
          console.log('something is wrong with Service Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }


  getJobDetails() {
    $("#loader").css("display", "block")
    this.jobDetailServiceObj.getJobsDetail().subscribe(
      response => {
        if (response != '') {
          $("#loader").css("display", "none")
          this.jobDtlsArr = response['jobData'];

          if (this.jobDtlsArr.length == 0)
            $("#NojobFound").css("display", "block")
          else
            $("#NojobFound").css("display", "none")

          this.companyFilter = response['companyFilter'];
          this.localityFilter = response['localityfilter'];
          this.jobTypefilter = response['jobTypefilter'];
          this.salaryFilter = response['salaryfilter'];
          this.careerStreamfilter = response['careerStreamfilter'];
          this.hotJobFilter = response['hotJobFilter'];

          this.salvalmin = this.salaryFilter[0]['ctcBandLowEnd'];
          this.salvalmax = this.salaryFilter[0]['ctcBandHighEnd'];

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


      if (fieldNm == 'JobCategory') {
        var arrayvals = [];
        this.multijobCatfilter.push(filterValue);
        arrayvals = this.multijobCatfilter;
      }

      this.datasets[fieldNm] = { data: arrayvals };
    } else {

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

    if (this.multijobCatfilter.length != 0) {
      $('#jobCatClear').show();
      $('#jobCatClearDot').show();
    }
    else {
      $('#jobCatClear').hide();
      $('#jobCatClearDot').hide();
    }

    this.getFilteredData();
  }


  getFilteredData() {
    $("#loader").css("display", "block")
    this.jobDetailServiceObj.getFilteredJobsDetail(this.datasets, this.fieldNameFilter).subscribe(
      response => {
        if (response != '') {
          $("#loader").css("display", "none")
          this.jobDtlsArr = response['jobData'];

          if (this.jobDtlsArr.length == 0)
            $("#NojobFound").css("display", "block")
          else
            $("#NojobFound").css("display", "none")

          this.filterByValue = sessionStorage.getItem('filterByValue');
          this.filterCriteria = sessionStorage.getItem('filterCriteria');

          if (typeof this.filterByValue !== 'undefined' && this.filterByValue !== null) {
            sessionStorage.removeItem('filterByValue');
            sessionStorage.removeItem('filterCriteria');
            this.filterByValue = '';
            this.companyFilter = response['companyFilter'];
            this.localityFilter = response['localityfilter'];
            this.jobTypefilter = response['jobTypefilter'];
            this.salaryFilter = response['salaryfilter'];
            this.careerStreamfilter = response['careerStreamfilter'];
            this.hotJobFilter = response['hotJobFilter'];

            this.salvalmin = this.salaryFilter[0]['ctcBandLowEnd'];
            this.salvalmax = this.salaryFilter[0]['ctcBandHighEnd'];
            this.createSalSlider();

          }
        }
        else {
          $("#loader").css("display", "none")
          console.log('something is wrong with Service Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
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
      this.multijobCatfilter = [];
    }

    this.getFilteredData();

  }


  categorizeJob(id) {

    this.jobid = id;
    this.jobTypeSelected = '';
    this.startDtSelected = '';
    this.endDateSelected = '';
    this.commentSelected = '';
    this.titleSelected = '';

    this.jobDetailServiceObj.getJobCategoryDetails(this.jobid, 0).subscribe(
      response => {
        if (response != '') {
          this.jobTypeSelected = response[0].job_type_id;
          this.startDtSelected = response[0].startDate;
          this.endDateSelected = response[0].endDate;
          this.commentSelected = response[0].comment;
          this.titleSelected = response[0].title;


          setTimeout(() => {
            // $('#jobCategoryModel').modal('show');
            this.openJobCategoryModel.nativeElement.click();

            this.jobCategoryForm.get('selJobType').setValue(this.jobTypeSelected);

            let syearval = parseInt(this.startDtSelected[0]);
            let smonthval = parseInt(this.startDtSelected[1]);
            let sdayval = parseInt(this.startDtSelected[2]);
            var sdateVal = { year: syearval, month: smonthval, day: sdayval }
            this.jobCategoryForm.get('startDate').setValue(sdateVal);

            let eyearval = parseInt(this.endDateSelected[0]);
            let emonthval = parseInt(this.endDateSelected[1]);
            let edayval = parseInt(this.endDateSelected[2]);
            var edateVal = { year: eyearval, month: emonthval, day: edayval }
            this.jobCategoryForm.get('endDate').setValue(edateVal);

            this.jobCategoryForm.get('txtComment').setValue(this.commentSelected);
            this.jobCategoryForm.get('txtTitle').setValue(this.titleSelected);


          }, 500);

        }
        else {  //form-control  
          this.jobCategoryForm.get('selJobType').setValue(this.jobTypeSelected);
          this.openJobCategoryModel.nativeElement.click();
          // setTimeout(() => {
          //   $('#jobCategoryModel').modal('show');
          // }, 500);

          console.log('No Record Found!');
        }
      },
      error => console.log("Error Occurd!")
    );


  }


  getSelectedJobTypeData() {

    let jobtypeId = this.jobCategoryForm.get('selJobType').value;

    this.jobDetailServiceObj.getJobCategoryDetails(this.jobid, jobtypeId).subscribe(
      response => {
        if (response != '') {
          this.jobTypeSelected = response[0].job_type_id;
          this.startDtSelected = response[0].startDate;
          this.endDateSelected = response[0].endDate;
          this.commentSelected = response[0].comment;
          this.titleSelected = response[0].title;

          this.jobCategoryForm.get('selJobType').setValue(this.jobTypeSelected);
          this.jobCategoryForm.get('txtComment').setValue(this.commentSelected);
          this.jobCategoryForm.get('txtTitle').setValue(this.titleSelected);

          let syearval = parseInt(this.startDtSelected[0]);
          let smonthval = parseInt(this.startDtSelected[1]);
          let sdayval = parseInt(this.startDtSelected[2]);
          var sdateVal = { year: syearval, month: smonthval, day: sdayval }

          let eyearval = parseInt(this.endDateSelected[0]);
          let emonthval = parseInt(this.endDateSelected[1]);
          let edayval = parseInt(this.endDateSelected[2]);
          var edateVal = { year: eyearval, month: emonthval, day: edayval }

          setTimeout(() => {
            this.jobCategoryForm.get('startDate').setValue(sdateVal);
            this.jobCategoryForm.get('endDate').setValue(edateVal);
          }, 100);

        }
        else {  //form-control  
          this.jobCategoryForm.get('selJobType').setValue(jobtypeId);
          this.jobCategoryForm.get('startDate').setValue('');
          this.jobCategoryForm.get('endDate').setValue('');

          console.log('No Record Found!');
        }
      },
      error => console.log("Error Occurd!")
    );



  }


  saveJobCategory(formObj) {

    var sDate = new Date($('#startDate').val());
    var eDate = new Date($('#endDate').val());

    if (sDate > eDate) {
      this.date_invalid = 'Invalid Date';
    }
    else {
      var jobTypeId = formObj.selJobType;
      var startDate = formObj.startDate.year + '-' + formObj.startDate.month + '-' + formObj.startDate.day;
      var endDate = formObj.endDate.year + '-' + formObj.endDate.month + '-' + formObj.endDate.day;
      var txtComment = formObj.txtComment;
      var txtTitle = formObj.txtTitle;


      this.jobDetailServiceObj.saveJobCategoryDetails(this.jobid, jobTypeId, startDate, endDate, txtComment, txtTitle).subscribe(
        response => {
          if (response != '') {
            alert('Data added/updated succesfully');
            // $('#jobCategoryModel').modal('hide');

            if (this.fieldNameFilter) {
              this.getFilteredData();
            }
            else {
              this.getJobDetails();
            }

          }
          else {
            console.log('something is wrong with Service Execution');
          }
        },
        error => console.log("Error Occurd!")
      );
    }
    // return false;
  }


  deleteJobCategory(jobid, jobTypeId) {

    this.jobDetailServiceObj.deleteJobCategory(jobid, jobTypeId).subscribe(
      response => {
        if (response != '') {
          alert('Job deleted successfully');
          if (this.fieldNameFilter) {
            this.getFilteredData();
          }
          else {
            this.getJobDetails();
          }
        }
        else {
          console.log('something is wrong with Service Execution');
        }
      },
      error => console.log("Error Occurd!")
    );

  }

  resetFormVals() {
    this.jobCategoryForm.reset();
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

  onDateSelect(event) {

  }

  ShowComment(comnt, title) {
    this.showComment = comnt;
    this.showTitle = title;
  }

  check(value1, value2) {
    if (value1.length > 0) {
      return (value1.filter(item => item.id == value2)).length
    }
  }


}
