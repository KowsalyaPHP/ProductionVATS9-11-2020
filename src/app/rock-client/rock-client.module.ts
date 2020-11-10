import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RockClientRoutingModule } from './rock-client-routing.module';
import { RockClientComponent } from './rock-client.component';

@NgModule({
  imports: [
    CommonModule,
    RockClientRoutingModule
  ],
  declarations: [RockClientComponent]
})
export class RockClientModule { }
