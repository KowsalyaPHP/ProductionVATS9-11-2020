import { Component, OnInit, state, ViewChild, ElementRef } from '@angular/core';
import { EmployerRegistrationService } from '../employer/employer-registration.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RockregisterService } from './rockregister.service';
declare const $: any;

@Component({
  selector: 'app-rockregister',
  templateUrl: './rockregister.component.html',
  styleUrls: ['./rockregister.component.css']
})
export class RockregisterComponent implements OnInit {

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

  constructor(private empRegistrationService: EmployerRegistrationService, private RockregisterServices: RockregisterService, private routerObj: Router, private modalService: NgbModal) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.registrationForm = new FormGroup({
      'first_name': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'last_name': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'company_name': new FormControl('', [Validators.required]),
      'mobile_number': new FormControl('', [Validators.required, Validators.max(999999999999), Validators.min(1111111111)]),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]),
      'employer_type': new FormControl('Rock Client')
    });
   
  }

  get first_name() { return this.registrationForm.get('first_name'); }
  get last_name() { return this.registrationForm.get('last_name'); }
  get company_name() { return this.registrationForm.get('company_name'); }
  get mobile_number() { return this.registrationForm.get('mobile_number'); }
  get email() { return this.registrationForm.get('email'); }



  addCustRegDetails(formObj) {
    // var password=formObj.password;
    // var confirmpassword=formObj.confirm_password;
    //if(password==confirmpassword){
    this.successMsg = "";
    this.errorMsg = "";
    $("#loader").css("display", "block")
    this.RockregisterServices.addCustomerRegistration(formObj).subscribe(
      response => {
        if (response != '') {
          if (response["RegistrationDetails"] == "Email ID is already registered") {
            this.errorMsg = "Email ID is already registered";
          }
          else {
           // this.successMsg = "Registered successfully. Your login details have been sent to the Email Id: " + this.email.value;
           // this.openEmployeeModal.nativeElement.click();
           this.routerObj.navigate(['/thankyou']);
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
    

  }


  redirectToHomePage() {
    // $('#employerModal').modal('hide');
    this.routerObj.navigate(['']);
  }


}
