import { Component, OnInit, state, ViewChild, ElementRef } from '@angular/core';
import { EmployerRegistrationService } from '../employer/employer-registration.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClientSignupService } from './client-signup.service';
declare const $: any;

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {

  registrationForm: FormGroup;
  closeResult: string;
  //password_not_match:string;
  country_id: number;
  state_id: number;
  getCountry_data: any = [];
  getSates_data: any = [];
  getCities_data: any = [];
  btnDisabled: boolean = true;
  successMsg: string = "";
  errorMsg: string = "";

  @ViewChild("openEmployeeModal") openEmployeeModal: ElementRef;

  constructor(private empRegistrationService: EmployerRegistrationService, private clientService: ClientSignupService, private routerObj: Router, private modalService: NgbModal) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.registrationForm = new FormGroup({
      'first_name': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'last_name': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'company_name': new FormControl('', [Validators.required]),
      'company_website': new FormControl(''),
      'company_address': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'pincode': new FormControl(''),
      'contact_number': new FormControl('', [Validators.pattern("[0-9]*[' '-]*[(]*[0-9]*[)-]*[' '-]*[0-9]*[' '-]*[0-9]*[' '-]*[0-9]*")]),
      'mobile_number': new FormControl('', [Validators.required, Validators.max(999999999999), Validators.min(1111111111)]),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]),
      'SPOC_name': new FormControl('', [Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'SPOC_mobile_number': new FormControl('', [Validators.max(999999999999), Validators.min(1111111111), Validators.pattern("[0-9]*")]),
      'SPOC_email': new FormControl('', [Validators.pattern("[a-z A-Z ,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]),
      'industry': new FormControl('', [Validators.required]),
      'employee_number': new FormControl(''),
      'employer_type': new FormControl('Rock Client')
    });
    this.getCountryList();
  }

  get first_name() { return this.registrationForm.get('first_name'); }
  get last_name() { return this.registrationForm.get('last_name'); }
  get company_name() { return this.registrationForm.get('company_name'); }
  get company_address() { return this.registrationForm.get('company_address'); }
  get contact_number() { return this.registrationForm.get('contact_number'); }
  get mobile_number() { return this.registrationForm.get('mobile_number'); }
  get email() { return this.registrationForm.get('email'); }
  get SPOC_name() { return this.registrationForm.get('SPOC_name'); }
  get SPOC_mobile_number() { return this.registrationForm.get('SPOC_mobile_number'); }
  get SPOC_email() { return this.registrationForm.get('SPOC_email'); }
  get industry() { return this.registrationForm.get('industry'); }



  addCustRegDetails(formObj) {
    // var password=formObj.password;
    // var confirmpassword=formObj.confirm_password;
    //if(password==confirmpassword){
    this.successMsg = "";
    this.errorMsg = "";
    $("#loader").css("display", "block")
    this.clientService.addCustomerRegistration(formObj).subscribe(
      response => {
        if (response != '') {
          if (response["RegistrationDetails"] == "Email ID is already registered") {
            this.errorMsg = "Email ID is already registered";
          }
          else {
            this.successMsg = "Registered successfully. Your login details have been sent to the Email Id: " + this.email.value;
            this.openEmployeeModal.nativeElement.click();
            this.registrationForm.reset();
            this.registrationForm.patchValue({ employer_type: 'Rock Client' });
          }

          // $('#employerModal').modal('show');

          $("#loader").css("display", "none");
          //  this.routerObj.navigate(['']);
          // $('#employerModal').modal('hide');
        }
        else {
          console.log('something is wrong with Service Execution');
          $("#loader").css("display", "none");
        }
      },
      error => { console.log("Error Occurd!"); $("#loader").css("display", "none"); }
    );
    // }
    // else
    // {
    //   this.password_not_match="Password not matching";
    // }

  }


  redirectToHomePage() {
    // $('#employerModal').modal('hide');
    this.routerObj.navigate(['']);
  }



  // Below functions used to get State and City data.
  GetStatesList(contry_id) {
    //alert(contry_id)

    this.country_id = contry_id;
    this.empRegistrationService.GetStateList(this.country_id).subscribe(
      response => {
        if (response != '') {
          this.registrationForm.get('state').enable();
          // this.btnDisabled = false;
          this.getSates_data = response;
          this.getCities_data = [];
          this.registrationForm.get('state').setValue('');
          // this.registrationForm.get('city').setValue('');
          //  this.registrationForm.get('city').disable();
        }
        else {
          console.log('something is wrong with GetStates Service');
          this.getSates_data = [];
        }
      },
      error => console.log("GetStates Service IS NOT WORKING!")
    );
  }

  GetCitiesList(state_id) {
    this.registrationForm.get('city').setValue('');
    this.state_id = state_id;
    this.empRegistrationService.GetCityList(this.state_id).subscribe(
      response => {
        if (response != '') {
          this.registrationForm.get('city').enable();
          this.getCities_data = response;
        }
        else {
          console.log('something is wrong with GetStates Service');
          this.getCities_data = [];
        }
      },
      error => console.log("GetStates Service IS NOT WORKING!")
    );
  }

  getCountryList() {
    this.empRegistrationService.GetCountryList().subscribe(
      response => {
        if (response != '') {
          this.getCountry_data = response;

        }
        else {
          console.log('something is wrong with GetStates Service');
          this.getCountry_data = [];
        }
      },
      error => console.log("GetCountry Service IS NOT WORKING!")
    );
  }

}
