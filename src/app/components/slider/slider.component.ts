import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Movies } from '../../models/movies.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  }

  //@Input() sliderConfig: Object;
  @Input() movies: Movies;
  @Input() title: string;

  //@ViewChild('slickModal') slickModal: SlickCarouselComponent;

  constructor() { }

  ngOnInit(): void {
  }

  afterChange(event: any) {
   
  }


}
