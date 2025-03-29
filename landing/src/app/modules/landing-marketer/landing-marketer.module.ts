import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "primeng/accordion";
import { MarketerLayoutComponent } from "./components/marketer-layout/marketer-layout.component";
import { MarketerMainComponent } from "./components/marketer-main/marketer-main.component";
import { MarketerNavbarComponent } from "./components/marketer-navbar/marketer-navbar.component";
import { LandingMarketerRoutingModule } from "./landing-marketer-routing.module";
import { SharedModule } from "src/app/_metronic/shared/shared.module";
import { MarketerAboutComponent } from './components/marketer-about/marketer-about.component';
import { HowWorkComponent } from './components/how-work/how-work.component';
import { KnowledgeComponent } from './components/knowledge/knowledge.component';

@NgModule({
  declarations: [
    MarketerLayoutComponent,
    MarketerNavbarComponent,
    MarketerMainComponent,
    MarketerAboutComponent,
    HowWorkComponent,
    KnowledgeComponent
  ],
  imports: [
    CommonModule,
    LandingMarketerRoutingModule,
    TranslateModule,
    AccordionModule,
    FormsModule,
    NgbDropdownModule,
    SharedModule

  ]
})
export class LandingMarketerModule { }
