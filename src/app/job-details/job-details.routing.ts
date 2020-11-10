import { Routes } from '@angular/router';
import {JobDetailsComponent} from './job-details.component';

export const JobDetailsRoutes: Routes = [{
  path: '',
  component: JobDetailsComponent,
  data: {
    breadcrumb: 'job-details',
    icon: '',
    status: false
  }
}];