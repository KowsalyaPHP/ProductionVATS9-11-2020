import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RateCardService } from './rate-card.service';
import { Router } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';
import { RateCard } from '../models/ratecard';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.css']
})
export class RateCardComponent implements OnInit {

  rateCardList: RateCard[] = [];
  rateCardForm: FormGroup;
  sessionId: any;
  userID: any;
  usrtype: any;
  isInsertRateCard: boolean = false;
  insertRateCardErrorMsg = "";
  todayDate = new Date();
  public minDate = this.todayDate.toDateString();
  en: any;
  @ViewChild("amount") amount: ElementRef;
  @ViewChild("percentage") percentage: ElementRef;

  @ViewChild("openInsertRateCardModal") openInsertRateCardModal: ElementRef;
  @ViewChild("closeInsertRateCardModal") closeInsertRateCardModal: ElementRef;

  constructor(private services: RateCardService, private routerObj: Router, private toastr: ToastrService) {
    this.sessionId = sessionStorage.getItem('uniqueSessionId');
    this.userID = sessionStorage.getItem('userID');
    this.usrtype = sessionStorage.getItem('usertype');
  }

  ngOnInit() {
    this.getRateCardList();
    this.rateCardForm = new FormGroup({
      Percentage: new FormControl(0),
      Amount: new FormControl(0),
      ValidFrom: new FormControl('', Validators.required),
      ValidTill: new FormControl(''),
      Remarks: new FormControl('', Validators.required)
    });

    setTimeout(function () {
      $(function () {
        $('#rateCardTable').DataTable();
      });
      //alert(this.isData);
    }, 1000);
  }


  get rc() {
    return this.rateCardForm.controls;
  }

  getRateCardList() {
    this.services.getRateCardList(this.sessionId, this.userID).subscribe(data => {
      if (data == <any>"Session MisMatch") {
        this.routerObj.navigate(['/login']);
      }
      this.rateCardList = <any>data;
    },
      error => {
        this.rateCardList = [];
      })
  }

  insertRateCardDet() {
    let perc = this.rc["Percentage"].value;
    let amt = this.rc["Amount"].value;
    let valFrom = this.rc["ValidFrom"].value;
    let valTill = this.rc["ValidTill"].value;
    let remarks = this.rc["Remarks"].value;
    if (!amt) {
      amt = 0;
    }
    if (!perc) {
      perc = 0;
    }
    if (!valTill) {
      valTill = new Date('2099-12-31');
    }

    if (perc == 0 && amt == 0) {
      this.insertRateCardErrorMsg = "Please percentage or amount";
      return;
    }
    else if (valFrom > valTill) {
      this.insertRateCardErrorMsg = "Valid Till should be greater than Valid From date";
      return;
    }
    else {
      let dat = this.rateCardList.find(x => new Date(x.ValidFrom) <= valFrom && new Date(x.ValidTill) >= valFrom);
      if (dat) {
        this.insertRateCardErrorMsg = "Invalid Valid From and Valid TIll date";
        return;
      }

      dat = this.rateCardList.find(x => new Date(x.ValidFrom) <= valTill && new Date(x.ValidTill) >= valTill);
      if (dat) {
        this.insertRateCardErrorMsg = "Invalid Valid From and Valid TIll date";
        return;
      }

    }

    this.insertRateCardErrorMsg = "";
    let data = {
      Percentage: perc,
      Amount: amt,
      ValidFrom: valFrom,
      ValidTill: valTill,
      Remarks: remarks,
      C_ID: this.userID
    };
    this.isInsertRateCard = true;
    this.services.insertRateCard(data).subscribe(data => {
      this.isInsertRateCard = false;
      if (data == <any>"Session MisMatch") {
        this.routerObj.navigate(['/login']);
      }
      else if (data == true) {
        this.toastr.success("Rate Card has been added successfully");
        this.closeInsertRateCardModal.nativeElement.click();
        this.getRateCardList();
      }
      else {
        this.insertRateCardErrorMsg = data;
      }
    },
      error => {
        this.isInsertRateCard = false;
        this.rateCardList = [];
      })

  }

  addNewRateCard() {
    this.openInsertRateCardModal.nativeElement.click();
    this.insertRateCardErrorMsg = "";
    this.rateCardForm.reset();
  }
  changeFromDate() {
    //   if (this.fromDate > this.tillDate) {
    //     this.tillDate = this.fromDate;
    //   }
  }

  changeTillDate() {
    //   if (this.fromDate > this.tillDate) {
    //     this.fromDate = this.tillDate;
    //   }
  }
  logout() {
    this.routerObj.navigate(['logout']);
  }

  percentageKeyUp(e) {
    let val = e.target.value;
    if (val) {
      if (val.indexOf(".") > -1) {
        let amtTemp = val.split(".");
        val = amtTemp[0] + "." + amtTemp[1].substring(0, 2);
      }
      if (val > 100) {
        val = 100;
      }
      e.target.value = val;
      if (this.amount) {
        this.amount.nativeElement.value = "";
      }
      this.rateCardForm.patchValue({ percentage: val, amount: "" });
    }
  }
  amountKeyUp(e) {
    let val = e.target.value;
    if (val) {
      if (val.indexOf(".") > -1) {
        let amtTemp = val.split(".");
        val = amtTemp[0] + "." + amtTemp[1].substring(0, 2);
      }
      e.target.value = val;
      if (this.percentage) {
        this.percentage.nativeElement.value = "";
      }

      this.rateCardForm.patchValue({ percentage: "", amount: val });
    }
  }
}
