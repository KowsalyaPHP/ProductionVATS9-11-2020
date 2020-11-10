import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateCardComponent } from './rate-card.component';

const routes: Routes = [{
  path: '',
  component: RateCardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateCardRoutingModule { }
