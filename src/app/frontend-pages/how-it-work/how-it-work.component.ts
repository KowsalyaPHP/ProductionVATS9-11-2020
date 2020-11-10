import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-work',
  templateUrl: './how-it-work.component.html',
  styleUrls: ['./how-it-work.component.css']
})
export class HowItWorkComponent implements OnInit {
  loggedIn: boolean;
  usrtype: any;
  usernm: any;
  constructor() {
    this.loggedIn = false;
    this.usrtype = sessionStorage.getItem('usertype');
    this.usernm = sessionStorage.getItem('username');
    if (typeof this.usernm !== 'undefined' && this.usernm !== null) {
      this.loggedIn = true;
    }
  }

  ngOnInit() {

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    $('#back-to-top').on('click', function () {
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
    }
  }

}
