import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    $(document).ready(function(){
      $(this).scrollTop(0);
   });

// below code is for - if user click on links in footer, which redirects to same/current page, then it will scroll up up the window instead of redirecting on same page
   $('#compw').on('click', function(){
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  });

  $('#contactTA').on('click', function(){
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  });

  $('#contactMgr').on('click', function(){
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  });

  $('#readAbt').on('click', function(){
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  });
  
          
  $('#hiwPartner').on('click', function(){
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  });

  $('#hiwEmployer').on('click', function(){
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  });
  

  
  }

}
