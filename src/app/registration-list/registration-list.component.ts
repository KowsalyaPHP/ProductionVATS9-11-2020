import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployerRegistrationService } from '../../app/employer/employer-registration.service';
import { RecruiterRegistrationService } from '../../app/recruiter/recruiter-registration.service';
import { Router } from '@angular/router';
import { RegistrationListService } from './registration-list.service';

declare var $: any;
@Component({

  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  regDataArr = [];
  recDataArr = [];
  isData: boolean = false;
  sessionId: any;
  userID: any;
  userType: any;
  userName: any;

  employerDetailsArr: any;
  recruiterDetailsArr: any;

  @ViewChild("openRecruiterData") openRecruiterData: ElementRef;
  @ViewChild("openEmployerData") openEmployerData: ElementRef;

  constructor(private EmpRegistrationService: EmployerRegistrationService, private recruiterRegService: RecruiterRegistrationService, private routerObj: Router, private RegistrationListServiceObj: RegistrationListService) {

    this.sessionId = sessionStorage.getItem('uniqueSessionId');
    this.userID = sessionStorage.getItem('userID');
    this.userType = sessionStorage.getItem('usertype');
    this.userName = sessionStorage.getItem('username');

    this.showCustRegList(this.sessionId, this.userID);
  }

  ngOnInit() {    
    setTimeout(function () {
      $(function () {
        $('#employerTable').DataTable();
        $('#recruiterTable').DataTable();
      });    
    }, 1000);

    $(document).ready(function () {
      $(this).scrollTop(0);
    });

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

  }

  showCustRegList(sessionID, userId) {
    this.EmpRegistrationService.showEmployerRegistrationList(sessionID, userId).subscribe(
      response => {
        if (response != '') {
          if (response == 'Session MisMatch') {
            this.routerObj.navigate(['/login']);
          }
          else {
            this.regDataArr = response;
           
          }
         
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );

    this.recruiterRegService.showRecruiterRegistrationList(sessionID, userId).subscribe(
      response => {
        if (response != '') {
          if (response == 'Session MisMatch') {
            this.routerObj.navigate(['/login']);
          }
          else {
            this.recDataArr = response;
          }
        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  changeStatus(id, statValue, email) {
    $("#loaderEmp_" + id).css("display", "inline-block");
    this.EmpRegistrationService.updateStatus(id, statValue, email, this.sessionId, this.userID).subscribe(
      response => {
        if (response != '') {
          if (statValue == 'Approve')
            alert("Record " + statValue + "d");

          if (statValue == 'Reject')
            alert("Record " + statValue + "ed");

          $("#loaderEmp_" + id).hide();
          this.showCustRegList(this.sessionId, this.userID);

        }
        else {
          $("#loaderEmp_" + id).hide();
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  changeRecStatus(id, statValue, emailid) {
    //check if recod already exist in mnh  
    $("#loaderRec_" + id).css("display", "inline-block");
    this.recruiterRegService.updateRecStatus(id, statValue, emailid, this.sessionId, this.userID).subscribe(
      response => {
        if (response != '') {

          this.RegistrationListServiceObj.checkRecordExistInMNH(id).subscribe(
            response => {
              if (response != '')       //if record is already exit in MNH, then Acivate/Deactivate it accordingly
              {
                if (statValue == 'Approve') {
                  alert("Record " + statValue + "d");

                  this.RegistrationListServiceObj.activateRecordInMNH(id).subscribe(
                    response => {
                      if (response != '') {
                      }
                      else {
                        console.log('something is wrong with Service  Execution');
                      }
                    },
                    error => console.log("Error Occurd!")
                  );
                }

                if (statValue == 'Reject') {
                  alert("Record " + statValue + "ed");

                  this.RegistrationListServiceObj.deactivateRecordInMNH(id).subscribe(
                    response => {
                      if (response != '') {
                      }
                      else {
                        console.log('something is wrong with Service  Execution');
                      }
                    },
                    error => console.log("Error Occurd!")
                  );

                }
              }
              else {                          // if record not exist in MNH then add it to MNH if records approved
                if (statValue == 'Approve') {
                  alert("Record " + statValue + "d");

                  this.RegistrationListServiceObj.addRecordToMNH(id).subscribe(
                    response => {
                      if (response != '') {
                      }
                      else {
                        console.log('something is wrong with Service  Execution');
                      }
                    },
                    error => console.log("Error Occurd!")
                  );

                }
                if (statValue == 'Reject') {       // && recordExist true
                  alert("Record " + statValue + "ed");
                  console.log('record Rejected in Emagine');
                }
              }
            },
            error => console.log("Error Occurd!")
          );
          $("#loaderRec_" + id).hide();
          this.showCustRegList(this.sessionId, this.userID);
        }
        else {
          $("#loaderRec_" + id).hide();
          console.log('something is wrong with Service  Execution,Record does not updated!');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  getEmployerDetails(id) {
    this.RegistrationListServiceObj.getEmployerDetilsData(id).subscribe(
      response => {
        if (response != '') {
          this.employerDetailsArr = response[0];
          this.openEmployerData.nativeElement.click();
          // setTimeout(function () {
          //   $(function () {
          //     $('#employerData').modal('show');
          //   });
          //   //alert(this.isData);
          // }, 500);

        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }



  getRecruiterDetails(id) {
    this.RegistrationListServiceObj.getRecruiterDetilsData(id).subscribe(
      response => {
        if (response != '') {
          this.recruiterDetailsArr = response[0];

          this.openRecruiterData.nativeElement.click();

          // setTimeout(function () {
          //   $(function () {
          //     $('#recruiterData').modal('show');
          //   });
          //   //alert(this.isData);
          // }, 500);

        }
        else {
          console.log('something is wrong with Service  Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }


  logout() {
    this.routerObj.navigate(['logout']);
  }


}
