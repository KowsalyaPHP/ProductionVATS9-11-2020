import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent ,NavigationCancel, NavigationError} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // production server
 // public static urlPath = "http://demo.emagine.co.in/emagine_services_demo/";
  public static urlPath = "https://emagine.co.in/emagine_services/";

  //for testing purpose local/test server
  //public static urlPath = "http://localhost/RecruitmentProject/";
  //  public static urlPath = "http://emaginesrv.talentserv.net/"; 
// public static urlPath = "http://localhost/emagine_serve/";
  
  show_footer: any = 'true';

 
  constructor(private router: Router) {

    router.events.subscribe((event: NavigationEvent) => {

      //Before Navigation
      if (event instanceof NavigationStart) {
        
        if (event.url == '/login' || event.url == '/employer' || event.url == '/recruiter' || event.url == '/login-rock'|| event.url == '/rockregister'|| event.url == '/thankyou'|| event.url == '/privacypolicy') {
          this.show_footer = 'false';          
        }
        else {
          this.show_footer = 'true';          
        }
      }

    });


  }

  ngOnInit() {



  }
 
}


