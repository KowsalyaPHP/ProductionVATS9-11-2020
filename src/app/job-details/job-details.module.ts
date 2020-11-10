import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsComponent} from './job-details.component';
import { JobDetailsRoutes } from './job-details.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { FormsModule }   from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JobDetailsRoutes),
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],

  declarations: [JobDetailsComponent, FilterPipe],
  entryComponents: [JobDetailsComponent],
 
})
export class JobDetailsModule { }
