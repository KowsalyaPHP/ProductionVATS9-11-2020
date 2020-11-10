import { Routes } from '@angular/router';
import {EmployerComponent} from './employer.component';

export const EmployerRoutes: Routes = [{
  path: '',
  component: EmployerComponent,
  data: {
    breadcrumb: 'employer',
    icon: '',
    status: false
  }
}];
