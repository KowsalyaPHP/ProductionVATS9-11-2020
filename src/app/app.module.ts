import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy
} from "@angular/common";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { EmployerRegistrationService } from "./employer/employer-registration.service";
import { HttpModule } from "@angular/http";
import { FormsModule, NgModel } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { RecruiterComponent } from "./recruiter/recruiter.component";
import { RecruiterRegistrationService } from "./recruiter/recruiter-registration.service";
import { RegistrationListComponent } from "./registration-list/registration-list.component";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login/login.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home/home.component";
import { HowItWorkComponent } from "./frontend-pages/how-it-work/how-it-work.component";
import { AboutUsComponent } from "./frontend-pages/about-us/about-us.component";
import { ContactComponent } from "./frontend-pages/contact/contact.component";
// import {JobDetailsComponent} from './job-details/job-details.component';
import { LogoutComponent } from "./logout/logout.component";
import { HomeService } from "./home/home.service";
import { JobDetailsService } from "./job-details/job-details.service";
import { ImageCropperModule } from "ng2-img-cropper";
import { EmployerListComponent } from "./employer-list/employer-list.component";
import { EmployerListService } from "./employer-list/employer-list.service";
import { RockregisterService } from "./rockregister/rockregister.service";
import { IonRangeSliderModule } from "ng2-ion-range-slider";
//import { JobCategoryComponent } from './job-category/job-category.component';
import { RegistrationListService } from "./registration-list/registration-list.service";
import { ContactService } from "./frontend-pages/contact/contact.service";
import { HiwEmployerComponent } from "./frontend-pages/hiw-employer/hiw-employer.component";
import { HiwPartnersComponent } from "./frontend-pages/hiw-partners/hiw-partners.component";
//import { CategoryLogsComponent } from './category-logs/category-logs.component';
import { FooterComponent } from "./frontend-pages/footer/footer.component";
import { OwlModule } from "ngx-owl-carousel";
import { RecruiterLogsComponent } from "./recruiter-logs/recruiter-logs.component";
import { RecruiterLogsService } from "./recruiter-logs/recruiter-logs.service";
import { ClientSignupService } from "./client-signup/client-signup.service";
import { ClientJobDetailsService } from "./client-job-details/client-job-details.service";
import { ClientListService } from "./client-list/client-list.service";
import { RateCardService } from "./rate-card/rate-card.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { LoginRockClientComponent } from "./login-rock-client/login-rock-client.component";
import { CommonService } from "./shared/services/common.service";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { DateTimePickerModule } from "ng-pick-datetime";
import { FilterPipe } from './filter.pipe';
import { RockregisterComponent } from './rockregister/rockregister.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTablesModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    ImageCropperModule,
    IonRangeSliderModule,
    OwlModule,
    ToastrModule.forRoot(),
    Ng2AutoCompleteModule,
    DateTimePickerModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    RecruiterComponent,
    RegistrationListComponent,
    LoginComponent,
    LoginRockClientComponent,
    HomeComponent,
    HowItWorkComponent,
    AboutUsComponent,
    ContactComponent,
    // JobDetailsComponent,
    LogoutComponent,
    EmployerListComponent,
    HiwEmployerComponent,
    HiwPartnersComponent,
    FooterComponent,
    RecruiterLogsComponent,
    FilterPipe,
    RockregisterComponent,
    ThankyouComponent,
    PrivacypolicyComponent
    // CategoryLogsComponent,
    // JobCategoryComponent,
  ],

  providers: [
    EmployerRegistrationService,
    RecruiterRegistrationService,
    LoginService,
    HomeService,
    JobDetailsService,
    ClientJobDetailsService,
    EmployerListService,
    RegistrationListService,
    ContactService,
    RecruiterLogsService,
    ClientSignupService,
    ClientListService,
    RateCardService,
    CommonService,
    RockregisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
