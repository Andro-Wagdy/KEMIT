import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeCarouselComponent implements OnInit {
  images: Array<string>;
  constructor(config: NgbCarouselConfig, ) {
    config.interval = 7000;
    config.wrap = true;
    config.keyboard = false;
    config.showNavigationArrows = false;

    config.pauseOnFocus=true
    this. images=[
      "https://images.hdqwalls.com/download/venom-darker-than-night-9e-1440x900.jpg",
      "https://images.hdqwalls.com/download/venom-darker-than-night-9e-1440x900.jpg",
      "https://images.hdqwalls.com/download/venom-darker-than-night-9e-1440x900.jpg",
    ]
   }

  ngOnInit() {

  }

}
