import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { JobDetailsService } from "../job-details/job-details.service";
declare const $: any;

@Component({
  selector: "app-category-logs",
  templateUrl: "./category-logs.component.html",
  styleUrls: ["./category-logs.component.css"]
})
export class CategoryLogsComponent implements OnInit {
  loggedIn: boolean;
  categoryLogssArr = [];
  usrtype: any;
  constructor(
    public jobDetailServiceObj: JobDetailsService,
    private routerObj: Router
  ) {
    this.loggedIn = false;
    var usernm = sessionStorage.getItem("username");
    this.usrtype = sessionStorage.getItem("usertype");
    if (typeof usernm !== "undefined" && usernm !== null) {
      this.loggedIn = true;
    }

    this.getCategoryLogsDetails();
  }

  getCategoryLogsDetails() {
    this.jobDetailServiceObj.getCategoryLogsData().subscribe(
      response => {
        if (response != "") {
          this.categoryLogssArr = response;
        } else {
          console.log("something is wrong with Service Execution");
        }
      },
      error => console.log("Error Occurd!")
    );
  }

  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $("#categoryLogTable").DataTable();
      });
      //alert(this.isData);
    }, 500);

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    $("#back-to-top").on("click", function () {
      $("body,html").animate(
        {
          scrollTop: 0
        },
        600
      );
    });
    window.scrollTo(0, 0);

    setTimeout(function () {
      $(".has-dropdown a").on("click", function () {
        $(this)
          .parent()
          .toggleClass("open-drop");
      });
    }, 1000);
  }

  logout() {
    this.routerObj.navigate(["logout"]);
  }
}
