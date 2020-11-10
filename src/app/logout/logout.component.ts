import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private routerObj : Router) { }

  ngOnInit() {
sessionStorage.clear();   
this.routerObj.navigate(['/login']);
  }

}
