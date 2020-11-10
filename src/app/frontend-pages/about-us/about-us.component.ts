declare const $: any;
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  loggedIn: boolean;
  usrtype: any;
  usernm: any;
  constructor(private commonService: CommonService) {
    this.loggedIn = false;
    this.usrtype = sessionStorage.getItem('usertype');
    this.usernm = sessionStorage.getItem('username');
    this.commonService.changeMetaContent('about-us');
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

    // below code is for - if user click on links in menu on a same page,then it will scroll up the window instead of redirecting/refreshing same page
    $('#abtus').on('click', function () {
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });

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

    ///////////////////////////
    // Mobile dropdown
    setTimeout(function () {
      $('.has-dropdown a').on('click', function () {
        $(this).parent().toggleClass('open-drop');
      });
    }, 1000);

    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

    //open team-member bio
    $('#cd-team').find('ul a').on('click', function (event) {
      event.preventDefault();
      var selected_member = $(this).data('type');
      $('.cd-member-bio.' + selected_member + '').addClass('slide-in');
      $('.cd-member-bio-close').addClass('is-visible');

      // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
      if (is_firefox) {
        $('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          $('body').addClass('overflow-hidden');
        });
      } else {
        $('main').addClass('slide-out');
        $('body').addClass('overflow-hidden');
      }

    });

    //close team-member bio
    $(document).on('click', '.cd-overlay, .cd-member-bio-close', function (event) {
      event.preventDefault();
      $('.cd-member-bio').removeClass('slide-in');
      $('.cd-member-bio-close').removeClass('is-visible');

      if (is_firefox) {
        $('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          $('body').removeClass('overflow-hidden');
        });
      } else {
        $('main').removeClass('slide-out');
        $('body').removeClass('overflow-hidden');
      }
    });
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
