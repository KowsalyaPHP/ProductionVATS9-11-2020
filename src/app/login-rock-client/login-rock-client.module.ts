import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRockClientRoutingModule } from './login-rock-client-routing.module';
import { LoginRockClientComponent } from './login-rock-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRockClientRoutingModule
  ],
  declarations: []
})
export class LoginRockClientModule { }
