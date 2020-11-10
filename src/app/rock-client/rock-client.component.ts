import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-rock-client',
  templateUrl: './rock-client.component.html',
  styleUrls: ['./rock-client.component.css']
})
export class RockClientComponent implements OnInit {

  loggedIn: boolean;
  usrtype: any;
  usernm: any;
  constructor(private routerObj: Router) {
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

    $(document).ready(function () {
      $(this).scrollTop(0);
    });

    $('#back-to-top').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });

    // below code is for - if user click on links in menu on a same page,then it will scroll up the window instead of redirecting/refreshing same page
    $('#hiwEmp').on('click', function () {
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


  gotoClientLogin() {
    this.routerObj.navigate(['/login']);
  }

  gotoClientSignup() {
    this.routerObj.navigate(['/client']);
  }
}
