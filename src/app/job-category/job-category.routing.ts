import { Routes } from '@angular/router';
import {JobCategoryComponent} from '../job-category/job-category.component';

export const JobCategoryRoutes: Routes = [{
  path: '',
  component: JobCategoryComponent,
  data: {
    breadcrumb: 'job-category',
    icon: '',
    status: false
  }
}];