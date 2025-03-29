import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { AccordionModule } from "primeng/accordion";
import { LandingSellerRoutingModule } from "./landing-seller-routing.module";
import { SellerLayoutComponent } from "./components/seller-layout/seller-layout.component";
import { SellerHowWorkComponent } from "./components/how-work/how-work.component";
import { SellerKnowledgeComponent } from "./components/knowledge/knowledge.component";
import { SellerAboutComponent } from "./components/seller-about/seller-about.component";
import { SellerMainComponent } from "./components/seller-main/seller-main.component";
import { SellerNavbarComponent } from "./components/seller-navbar/seller-navbar.component";
import { SharedModule } from "src/app/_metronic/shared/shared.module";
import { SellerContactUsComponent } from './components/seller-contact-us/seller-contact-us.component';

@NgModule({
  declarations: [
    SellerLayoutComponent,
    SellerNavbarComponent,
    SellerMainComponent,
    SellerAboutComponent,
    SellerHowWorkComponent,
    SellerKnowledgeComponent,
    SellerContactUsComponent
  ],
  imports: [
    CommonModule,
    LandingSellerRoutingModule,
    TranslateModule,
    AccordionModule,
    FormsModule,
    NgbDropdownModule,
    SharedModule
  ]
})
export class LandingSellerModule { }
