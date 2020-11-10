import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSignupRoutingModule } from './client-signup-routing.module';
import { ClientSignupComponent } from './client-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientSignupRoutingModule
  ],
  declarations: [ClientSignupComponent]
})
export class ClientSignupModule { }
