import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientJobDetailsRoutingModule } from './client-job-details-routing.module';
import { ClientJobDetailsComponent } from './client-job-details.component';

@NgModule({
  imports: [
    CommonModule,
    ClientJobDetailsRoutingModule
  ],
  declarations: [ClientJobDetailsComponent]
})
export class ClientJobDetailsModule { }
