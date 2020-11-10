import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//import {MenuComponent} from './menu/menu.component';
//import {EmployerComponent} from './employer/employer.component';
import { RecruiterComponent } from "./recruiter/recruiter.component";
import { RegistrationListComponent } from "./registration-list/registration-list.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { HowItWorkComponent } from "./frontend-pages/how-it-work/how-it-work.component";
import { AboutUsComponent } from "./frontend-pages/about-us/about-us.component";
import { ContactComponent } from "./frontend-pages/contact/contact.component";
//import {JobDetailsComponent} from './job-details/job-details.component';
import { LogoutComponent } from "./logout/logout.component";
import { EmployerListComponent } from "./employer-list/employer-list.component";
import { HiwEmployerComponent } from "./frontend-pages/hiw-employer/hiw-employer.component";
import { HiwPartnersComponent } from "./frontend-pages/hiw-partners/hiw-partners.component";
import { CategoryLogsComponent } from "./category-logs/category-logs.component";
import { FooterComponent } from "./frontend-pages/footer/footer.component";
import { RecruiterLogsComponent } from "./recruiter-logs/recruiter-logs.component";
import { LoginRockClientComponent } from "./login-rock-client/login-rock-client.component";
import { RockregisterComponent } from './rockregister/rockregister.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

export const AppRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: []
  },

  {
    path: "job-details",
    loadChildren: "./job-details/job-details.module#JobDetailsModule" // or job-details
  },
  {
    path: "employer",
    loadChildren: "./employer/employer.module#EmployerModule" // or RecruiterComponent
  },
  {
    path: "client",
    loadChildren: "./client-signup/client-signup.module#ClientSignupModule" // or RecruiterComponent
  },
  {
    path: "job-category",
    loadChildren: "./job-category/job-category.module#JobCategoryModule" // or job-details
  },
  {
    path: "category-logs",
    loadChildren: "./category-logs/category-logs.module#CategoryLogsModule"
  },

  {
    path: "app-registration-list",
    component: RegistrationListComponent
  },
  {
    path: "recruiter-logs",
    component: RecruiterLogsComponent
  },
  {
    path: "how-it-work",
    component: HowItWorkComponent
  },
  {
    path: "hiw-Employer",
    component: HiwEmployerComponent
  },
  {
    path: "hiw-partners",
    component: HiwPartnersComponent
  },

  {
    path: "about-us",
    component: AboutUsComponent
  },

  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "recruiter",
    component: RecruiterComponent
  },
  {
    path: "employerlist",
    component: EmployerListComponent
  },
  {
    path: 'clientlist',
    loadChildren: "./client-list/client-list.module#ClientListModule"
  },
  {
    path: 'ratecard',
    loadChildren: "./rate-card/rate-card.module#RateCardModule"
  },
  {
    path: "page-footer",
    component: FooterComponent
  },

  {
    path: "rockregister",
    component: RockregisterComponent
  },
  {
    path: "thankyou",
    component: ThankyouComponent
  },
  {
    path: "privacypolicy",
    component: PrivacypolicyComponent
  },

  {
    path: "logout",
    component: LogoutComponent
  },

  {
    path: "client-job-details",
    loadChildren: "./client-job-details/client-job-details.module#ClientJobDetailsModule" // or job-details
  },
  {
    path: "rock",
    loadChildren: "./rock-client/rock-client.module#RockClientModule"
  },
  {
    path: "login-rock",
    component: LoginRockClientComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
