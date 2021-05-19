import { Component, Input, OnInit} from '@angular/core';
import { Movies } from '../../models/movies.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  endSlide = 12;
  page = 1;
  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    infinite: false,
    responsive:
      [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2
          }
        }
      ]
  }

  subs: Subscription[] = [];
  @Input() movies: Movies;
  @Input() trending: Movies;
  @Input() title: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDetails(movie: any) {
    const type = movie.media_type ? movie.media_type : 'movie';
    this.router.navigate([`details/${type}/${movie.id}`]);
  }

}
