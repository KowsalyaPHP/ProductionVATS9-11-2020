import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
goCustomer(){
  this.router.navigate(['employer']);
}
goRecruiter(){
  this.router.navigate(['recruiter']);
}
goabout(){
  this.router.navigate(['about']);
}
goRegistrationList(){
   this.router.navigate(['registrationList']);
}
gohome(){
   this.router.navigate(['']);
}
}
