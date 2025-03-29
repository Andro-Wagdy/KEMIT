import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingLayoutComponent } from './components/landing-layout/landing-layout.component';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { LandingMainComponent } from './components/landing-main/landing-main.component';
import { LandingServiceComponent } from './components/landing-service/landing-service.component';
import { LandingAboutComponent } from './components/landing-about/landing-about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
 import { TranslateModule } from '@ngx-translate/core';
import { CommonQuestionsComponent } from './components/common-questions/common-questions.component';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { JoinToUsComponent } from './components/join-to-us/join-to-us.component';
 import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { LandingServiceSecondComponent } from './components/landing-service-second/landing-service-second.component';
import { ExtrasModule } from 'src/app/_metronic/partials';

@NgModule({
  declarations: [
    LandingLayoutComponent,
    LandingNavbarComponent,
    LandingMainComponent,
    LandingServiceComponent,
    LandingAboutComponent,
    ContactUsComponent,
    CommonQuestionsComponent,
    JoinToUsComponent,
    LandingServiceSecondComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    TranslateModule,
    AccordionModule,
    FormsModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class LandingModule { }
