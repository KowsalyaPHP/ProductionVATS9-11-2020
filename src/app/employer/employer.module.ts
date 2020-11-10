import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerComponent} from './employer.component';
import { EmployerRoutes } from './employer.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmployerRoutes),
    ReactiveFormsModule,
    NgbModule  
  ],

  declarations: [EmployerComponent],
  entryComponents: [EmployerComponent],
 
})
export class EmployerModule { }
