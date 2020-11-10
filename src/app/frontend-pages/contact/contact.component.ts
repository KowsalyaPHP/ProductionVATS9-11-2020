
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './contact.service'
import { CommonService } from '../../shared/services/common.service';
declare const $: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loggedIn: boolean;
  usrtype: any;
  usernm: any;
  btnDisabled: boolean = true;

  @ViewChild("openContactModal") openContactModal: ElementRef;

  constructor(private contactService: ContactService, private formBuilderObj: FormBuilder, private commonService: CommonService) {
    this.contactForm = this.formBuilderObj.group({
      partnerType: '',
      contactname: '',
      contactemail: '',
      subject: '',
      message: ''
    });

    this.loggedIn = false;
    this.usrtype = sessionStorage.getItem('usertype');
    this.usernm = sessionStorage.getItem('username');
    this.commonService.changeMetaContent('contact');
    if (typeof this.usernm !== 'undefined' && this.usernm !== null) {
      this.loggedIn = true;
    }
  }

  ngOnInit() {

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }


    $(document).ready(function () {
      $(this).scrollTop(0);
    });

    // below code is for - if user click on links in menu on a same page,then it will scroll up the window instead of redirecting/refreshing same page
    $('#contactpg').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });

    ///////////////////////////
    // Btn nav collapse
    setTimeout(function () {
      $('#nav .nav-collapse').on('click', function () {
        $('#nav').toggleClass('open');
      });
    }, 1000);

    ///////////////////////////
    // Mobile dropdown
    setTimeout(function () {
      $('.has-dropdown a').on('click', function () {
        $(this).parent().toggleClass('open-drop');
      });
    }, 1000);


    this.contactForm = new FormGroup({
      'partnerType': new FormControl('', [Validators.required]),
      'contactname': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z . _ & ' ' -]+")]),
      'contactemail': new FormControl('', [Validators.required, Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")]),
      'subject': new FormControl(''),
      'message': new FormControl('')
    });
  }
  get partnerType() { return this.contactForm.get('partnerType'); }
  get contactname() { return this.contactForm.get('contactname'); }
  get contactemail() { return this.contactForm.get('contactemail'); }

  submitContactDetails(formObj) {
    $("#loader").show();
    this.contactService.saveContactData(formObj).subscribe(
      response => {
        if (response != 'No data') {
          // $('#contactModal').modal('show');
          this.openContactModal.nativeElement.click();
          this.contactForm.reset();
          //hide loder
          $("#loader").hide();
        }
        else {
          console.log('something is wrong with Service Execution');
          $("#loader").hide();
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
      $('#loginModel').modal('show');
    }
  }

}
