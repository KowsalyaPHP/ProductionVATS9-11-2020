import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login/login.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { JobDetailsService } from "../job-details/job-details.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { RateCard } from "../models/ratecard";
declare const $: any;

@Component({
  selector: 'app-login-rock-client',
  templateUrl: './login-rock-client.component.html',
  styleUrls: ['./login-rock-client.component.css']
})
export class LoginRockClientComponent implements OnInit {

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  dispVar: any = "none";
  sessionID: any;
  userID: any;
  forgotPwdmail: any;

  loggedIn: boolean;
  usrtype: any;
  rateCard: RateCard;
  offer: string;
  valid: string;

  constructor(
    private loginService: LoginService,
    private formBuilderObj: FormBuilder,
    private routerObj: Router,
    private route: ActivatedRoute,
    public jobDetailServiceObj: JobDetailsService,
    private modalService: NgbModal
  ) {
    this.loginForm = this.formBuilderObj.group({
      username: "",
      password: "",
      loginAs: "Rock Client"
    });

    this.forgotPasswordForm = this.formBuilderObj.group({
      forgotPasswordmail: "",
      loginType: ""
    });

    this.loggedIn = false;
    this.usrtype = sessionStorage.getItem("usertype");
    var usernm = sessionStorage.getItem("username");
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
  }

  ngOnInit() {
    this.getCurrectRateCard();
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

  getCurrectRateCard() {
    this.offer = "";
    this.loginService.getCurrentRateCard().subscribe(res => {
      if (res && res.length > 0) {
        this.rateCard = res[0];
        if (this.rateCard.Percentage && this.rateCard.Percentage > 0) {
          this.offer = this.rateCard.Percentage + "%";
        }
        else if (this.rateCard.Amount && this.rateCard.Amount > 0) {
          this.offer = "₹" + this.rateCard.Amount;
        }

        this.rateCard.ValidTill = new Date(this.rateCard.ValidTill);
        let date = this.rateCard.ValidTill.getDate();
        if (date % 10 == 1) {
          date = <any>(date + "st");
        }
        else if (date % 10 == 2) {
          date = <any>(date + "nd");
        }
        else {
          date = <any>(date + "th");
        }
        let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let mon = month[this.rateCard.ValidTill.getMonth()];
        this.valid = date + " " + mon;
        if (this.rateCard.ValidTill.getFullYear() > 2019) {
          this.valid = this.valid + " " + this.rateCard.ValidTill.getFullYear();
        }
      }
      else {
        this.rateCard = null;
      }
    },
      error => {
        this.rateCard = null;
      })
  }

}
