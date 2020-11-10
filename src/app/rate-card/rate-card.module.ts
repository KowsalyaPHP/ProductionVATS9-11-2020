import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from 'ng-pick-datetime';


import { RateCardRoutingModule } from './rate-card-routing.module';
import { RateCardComponent } from './rate-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RateCardRoutingModule,
    DateTimePickerModule
  ],
  declarations: [RateCardComponent]
})
export class RateCardModule { }
