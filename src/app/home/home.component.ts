declare const $: any;
import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { JobDetailsService } from '../job-details/job-details.service';
import { CommonService } from '../shared/services/common.service';


@Component({
  selector: 'app-home',
  providers: [JobDetailsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeDataArr = [];
  hotJobDataArr =[];
  jobDtlsArr = [];
  loggedIn: boolean;
  usrtype: any;
  usernm: any;
  showComment: any;
  showTitle: any;
  visibility: any;
  title_style = "";
  comment_style = "";
  title_animate = "";
  comment_animate = "";
  logoSliderOptions;
  constructor(private routerObj: Router, private homeService: HomeService, private jobobj: JobDetailsComponent, public jobDetailServiceObj: JobDetailsService, private commonService: CommonService) {
    this.loggedIn = false;
    this.usrtype = sessionStorage.getItem('usertype');
    this.usernm = sessionStorage.getItem('username');
    this.commonService.changeMetaContent('home');
    if (typeof this.usernm !== 'undefined' && this.usernm !== null) {
      this.loggedIn = true;
    }
    this.getHomeContent();
    this.onResize();
  }

  ngOnInit() {

    setTimeout(function () {
      $(".mybuttonrtr").hover(function () {
        $('.top-offers').modal({
          show: true,
          backdrop: true
        })
      });
    }, 1000);


    // setTimeout(function() {
    //   $("#my-offers").hover(function () {
    //     $('#exampleModal').modal({
    //         show: true,
    //         backdrop: true
    //     })
    // });
    // }, 1000); 


    // $('body,html').animate({
    //     scrollTop: 0
    //   }, 200);
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
    $('#homepg').on('click', function () {
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

    setTimeout(function () {
      $('.counter-count').each(function () {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
            duration: 3000,
            easing: 'linear',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
      });
    }, 1000);

    setTimeout(function () {
      $("#owl-carousel-1").owlCarousel({
        items: 8,
        loop: true,
        margin: 0,
        nav: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: false,
        autoplay: true,
        autoplayTimeout: 800,
      });
    }, 2000);

    setTimeout(function () {
      $('#employer-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 15,
        nav: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: true,
        autoplay: true,
        //animateOut: 'Slide'
      });
    }, 1000);

    //   $('#vertical-slide-1').vTicker({
    //         showItems: 1

    //    });

    //    $('#vertical-slide').vTicker({
    //     showItems: 1

    // });
    setTimeout(function () {
      // Slideshow 4
      $("#slider4").responsiveSlides({
        auto: true,
        pager: false,
        nav: false,
        speed: 500,
        namespace: "callbacks",
        before: function () {
          $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
          $('.events').append("<li>after event fired.</li>");
        }
      });
    });


    setTimeout(function () {
      $('#open-job-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: true,
        autoplay: true,
        //animateOut: 'Slide'
        responsive: {
          0: {
            items: 1,

          },
          480: {
            items: 1,

          },
          768: {
            items: 1,

          },
          980: {
            items: 1,

          }
        }
      });
    }, 1000);

    //   setTimeout(function() {

    //     $('#vertical-slide').vTicker({
    //       speed: 500,
    //       pause: 2800,
    //       animation:'fade',
    //       mousePause:true,
    //       direction:'down'
    //     });

    // }, 1000); 

    // setTimeout(function() {
    //   $(function() {

    //    $('#vertical-slide-1').vTicker({
    //       speed: 800,
    //       pause: 2000,
    //       animation:'fade',
    //       mousePause:true,
    //       direction:'down'
    //     });
    //    });
    //    }, 1000);   

    $(function () {
      $('#home').css({ 'height': (($(window).height()) - 10) + 'px' });

      $(window).bind('resize', function () {
        $('#home').css({ 'height': (($(window).height()) - 10) + 'px' });
        //alert('resized');
      });
    });


  }



  @HostListener('window:resize', ['$event'])
  onResize() {
    let itemCount = Math.round(window.innerWidth / 130) - 1;

    this.logoSliderOptions = { items: itemCount, dots: false, navigation: false, autoplay: true, autoplayTimeout: 500, loop: true }
  }

  play_video() {
    //alert("hh");
    $("#video").show();
    $(".mj_videodiv").hide();
  }

  play_video_two() {
    $("#video-2").show();
    $(".mj_videodiv-2").hide();
  }

  ShowComment(comnt, title) {
    this.showComment = comnt;
    this.showTitle = title;
  }

  getHomeContent() {
    this.homeService.GetHomeDetails().subscribe(
      response => {
        if (response != '') {
          this.homeDataArr = response;

        }
        else {
          console.log('something is wrong with Service Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }
  /*Changes*/
  getHotJobContent(buId) {
    $("#loader").css("display", "block");
    $(".hotjobs").css("display", "none");
    this.homeService.GetHotJobs(buId).subscribe(
      response => {
        if (response != '') {
          $("#loader").css("display", "none");
          $(".hotjobs").css("display", "block");
          $('.check').removeClass('active');
          this.hotJobDataArr = response;                  
        }
        else {
          console.log('something is wrong with Service Execution');
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  redirectToJobDetails(filterByValue, filterCriteria) {
    sessionStorage.setItem('filterByValue', filterByValue);
    sessionStorage.setItem('filterCriteria', filterCriteria);
    sessionStorage.setItem('fieldSet', filterCriteria);
    this.routerObj.navigate(['/job-details']);
  }

  gotoEmployerRegistration() {
    this.routerObj.navigate(['/employer']);
  }

  gotoRecruiterRegistration() {
    this.routerObj.navigate(['/recruiter']);
  }

  redirectToJobDtl() {
    this.routerObj.navigate(['/job-details']);
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


