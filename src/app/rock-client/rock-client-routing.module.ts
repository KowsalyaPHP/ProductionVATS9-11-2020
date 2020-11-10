import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RockClientComponent } from './rock-client.component';

const routes: Routes = [{
  path: '', component: RockClientComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RockClientRoutingModule { }
