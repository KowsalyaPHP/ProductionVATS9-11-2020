import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
//jobDetailServiceObj
import { JobDetailsService } from "../job-details/job-details.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from "../shared/services/common.service";
//import { UUID } from 'angular2-uuid';
declare const $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  dispVar: any = "none";
  sessionID: any;
  userID: any;
  forgotPwdmail: any;

  loggedIn: boolean;
  usrtype: any;

  constructor(
    private loginService: LoginService,
    private formBuilderObj: FormBuilder,
    private routerObj: Router,
    private route: ActivatedRoute,
    public jobDetailServiceObj: JobDetailsService,
    private modalService: NgbModal,
    private commonService: CommonService
  ) {
    this.loginForm = this.formBuilderObj.group({
      username: "",
      password: "",
      loginAs: ""
    });

    this.forgotPasswordForm = this.formBuilderObj.group({
      forgotPasswordmail: "",
      loginType: ""
    });

    this.loggedIn = false;
    this.usrtype = sessionStorage.getItem("usertype");
    var usernm = sessionStorage.getItem("username");
    this.commonService.changeMetaContent('login');
    if (typeof usernm !== "undefined" && usernm !== null) {
      this.loggedIn = true;
    }
  }
  validateLoginDetails(formObj) {
    this.loginService.validateLoginDetail(formObj).subscribe(
      response => {
        if (response != "No data") {
          if (response == "Session MisMatch") {
            this.routerObj.navigate(["/login"]);
          } else {
            this.sessionID = response[0]["uniqueId"];
            this.userID = response[0]["id"];
            sessionStorage.setItem("uniqueSessionId", this.sessionID);
            sessionStorage.setItem("userID", this.userID);
            sessionStorage.setItem("usertype", response[0]["usertype"]);
            sessionStorage.setItem('applicantSourceId', response[0]["applicantSourceId"]);
            sessionStorage.setItem("username", response[0]["username"]);
            sessionStorage.setItem("userpwd", formObj.password);

            if (response[0]["usertype"] == "Admin") {
              this.routerObj.navigate(["/app-registration-list"]);
            }
            else if (response[0]["usertype"] == "Rock Client") {
              this.routerObj.navigate(["/client-job-details"]);
            }
            else {
              this.routerObj.navigate(["/job-details"]);
            }
          }
        } else {
          this.dispVar = "block";
          console.log("something is wrong with Service Execution");
        }
      },
      error => console.log(error)
    );
  }
  // generateSessionID():string
  // {
  //   const uuid = UUID.UUID();
  //   return uuid;
  // }
  clientRegistration() {
    this.routerObj.navigate(["client"]);
  }
  employerRegistration() {
    this.routerObj.navigate(["/employer"]);
  }
  recruiterRegistration() {
    this.routerObj.navigate(["/recruiter"]);
  }

  SendForgotPasswordMail(forgotPwdformObj) {
    this.loginService.sendForgotPwdDetail(forgotPwdformObj).subscribe(
      response => {
        if (response != "No data" && response != "") {
          this.forgotPasswordForm.reset();
          alert("Mail Sent");
          $("#ForgotPassword").modal("hide");
        } else {
          alert("Entered MailId is not available in System!");
          console.log("Entered MailId is not available in System!");
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  redirectToMNH(loginAs) {
    if (loginAs == "Employer") {
      //below link to open url on same page
      //window.location.href='https://emagine.mynexthire.com/employer/ui/html/wow/wow.html#/login';
      //below link to open url on other tab
      window.open(
        "https://emagine.mynexthire.com/employer/ui/html/wow/wow.html#/login",
        "_blank"
      );
    }
    else if (loginAs == "Rock Client") {
      this.routerObj.navigate(['/login-rock']);
    }
  }

  ngOnInit() {
    ///////////////////////////
    // Btn nav collapse
    setTimeout(function () {
      $("#nav .nav-collapse").on("click", function () {
        $("#nav").toggleClass("open");
      });
    }, 1000);

    ///////////////////////////
    // Mobile dropdown
    setTimeout(function () {
      $(".has-dropdown a").on("click", function () {
        $(this)
          .parent()
          .toggleClass("open-drop");
      });
    }, 1000);

    this.forgotPasswordForm = new FormGroup({
      forgotPasswordmail: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z A-Z,0-9,.,_]+@[a-z A-Z]+[.]+[a-z A-Z,.]+")
      ]),
      loginType: new FormControl("", [Validators.required])
    });
  }

  get forgotPasswordmail() {
    return this.forgotPasswordForm.get("forgotPasswordmail");
  }
  get loginType() {
    return this.forgotPasswordForm.get("loginType");
  }
}
