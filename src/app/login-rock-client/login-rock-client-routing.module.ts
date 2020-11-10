import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRockClientComponent } from './login-rock-client.component';

const routes: Routes = [{
  path: '',
  component: LoginRockClientComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRockClientRoutingModule { }
