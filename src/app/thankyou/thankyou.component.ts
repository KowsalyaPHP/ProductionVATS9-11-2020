import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  
  constructor(private router: Router) {
    
  }

  ngOnInit() {
    // do init at here for current route.

    setTimeout(() => {
        this.router.navigate(['/']);
    }, 5000);  //5s
}

}
