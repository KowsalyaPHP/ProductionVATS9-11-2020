import { Routes } from '@angular/router';
import {CategoryLogsComponent} from '../category-logs/category-logs.component';

export const CategoryLogsRoutes: Routes = [{
  path: '',
  component: CategoryLogsComponent,
  data: {
    breadcrumb: 'category-logs',
    icon: '',
    status: false
  }
}];