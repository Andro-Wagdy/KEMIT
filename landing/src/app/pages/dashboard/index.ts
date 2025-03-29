import { DashboardComponent } from "./dashboard.component"
import { HomeCarouselComponent } from "./home-carousel/home-carousel.component"
import { HomeMarchantComponent } from "./home-marchant/home-marchant.component"
import { HomeMarketerComponent } from "./home-marketer/home-marketer.component"
export const components: any[] = [
  HomeCarouselComponent,
  DashboardComponent,
  HomeMarchantComponent,
  HomeMarketerComponent,
]
export *  from "./home-carousel/home-carousel.component"
export *  from "./dashboard.component"
export *  from "./home-marchant/home-marchant.component"
export *  from "./home-marketer/home-marketer.component"

