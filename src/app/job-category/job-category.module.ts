import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCategoryComponent} from './job-category.component';
import { JobCategoryRoutes } from './job-category.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JobCategoryRoutes),
    ReactiveFormsModule,
    NgbModule  
  ],

  declarations: [JobCategoryComponent],
  entryComponents: [JobCategoryComponent],
 
})
export class JobCategoryModule { }
