import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecruiterRegistrationService } from './recruiter-registration.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare const $: any;

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {
  recruiterForm: FormGroup;
  closeResult: string;
  //password_not_match:string;

  @ViewChild("openRecruiterModal") openRecruiterModal: ElementRef;

  constructor(private recRegistrationService: RecruiterRegistrationService, private formBuilderObj: FormBuilder, private routerObj: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.recruiterForm = new FormGroup({ // <-- the parent FormGroup
      'company_name': new FormControl('', [Validators.required]),
      //     'company_website': new FormControl(''),
      //     'company_address': new FormControl('',[Validators.required]),
      'city': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'team_size': new FormControl('', [Validators.required]),
      'specialised_sector': new FormControl('', [Validators.required]),
      //     'registration_number': new FormControl('',[Validators.required,Validators.pattern("[- 0-9 a-z A-Z ! @ $ . _ & () ' '  % # `.+ * ,/\ ]{21}")]),
      'GST_number': new FormControl(''),
      'owner_name': new FormControl('', [Validators.required]),
      'contact_number': new FormControl('', [Validators.required, Validators.max(999999999999), Validators.min(1111111111)]),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z,0-9,.,_]+@[a-z]+[.]+[a-z,.]+")]),
      'SPOC_name': new FormControl('', [Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'SPOC_mobile_number': new FormControl('', [Validators.max(999999999999), Validators.min(1111111111), Validators.pattern("[0-9]*")]),
      'SPOC_email': new FormControl('', [Validators.pattern("[a-z,0-9,.,_]+@[a-z]+[.]+[a-z,.]+")])
      //   'password': new FormControl('',[Validators.required]),
      //   'confirm_password': new FormControl('',[Validators.required])
    });

    ///////////////////////////
    // Btn nav collapse
    setTimeout(function () {
      $('#nav .nav-collapse').on('click', function () {
        $('#nav').toggleClass('open');
      });
    }, 1000);
  }

  get company_name() { return this.recruiterForm.get('company_name'); }
  // get company_address() { return this.recruiterForm.get('company_address'); }
  get city() { return this.recruiterForm.get('city'); }
  get team_size() { return this.recruiterForm.get('team_size'); }
  get specialised_sector() { return this.recruiterForm.get('specialised_sector'); }
  // get registration_number() { return this.recruiterForm.get('registration_number'); }
  get GST_number() { return this.recruiterForm.get('GST_number'); }
  get owner_name() { return this.recruiterForm.get('owner_name'); }
  get contact_number() { return this.recruiterForm.get('contact_number'); }
  get email() { return this.recruiterForm.get('email'); }
  get SPOC_name() { return this.recruiterForm.get('SPOC_name'); }
  get SPOC_mobile_number() { return this.recruiterForm.get('SPOC_mobile_number'); }
  get SPOC_email() { return this.recruiterForm.get('SPOC_email'); }
  //get password() { return this.recruiterForm.get('password'); }
  // get confirm_password() { return this.recruiterForm.get('confirm_password'); }


  addRecRegDetails(formObj) {
    //  var password=formObj.password;
    //  var confirmpassword=formObj.confirm_password;
    //   if(password==confirmpassword){
    $("#loader").css("display", "block")
    this.recRegistrationService.addRecruiterRegistration(formObj).subscribe(
      response => {
        if (response != '') {
          this.openRecruiterModal.nativeElement.click();
          // $('#recruiterModal').modal('show');
          this.recruiterForm.reset();
          $("#loader").hide();
          //            this.password_not_match = '';
          // this.routerObj.navigate(['/registrationList']);
        }
        else {
          console.log('something is wrong with Service  Execution');
          $("#loader").hide();
        }
      },
      error => console.log("Error Occurd!")
    );
    //   }
    //   else{
    //     this.password_not_match="Password not matching";
    //   }
  }

  // Below code is to display model popup/dialouge box on click of register

  redirectToHomePage() {
    $('#employerModal').modal('hide');
    this.routerObj.navigate(['']);
  }

}
