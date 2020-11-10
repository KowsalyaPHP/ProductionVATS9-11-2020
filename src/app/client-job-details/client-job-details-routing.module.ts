import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientJobDetailsComponent } from './client-job-details.component';

const routes: Routes = [{
  path: '', component: ClientJobDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientJobDetailsRoutingModule { }
