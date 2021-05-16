import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Movies } from '../../models/movies.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
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
    //infinite: false,
    responsive:
      [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },

      ]


  }
  subs: Subscription[] = [];
  //@Input() sliderConfig: Object;
  @Input() movies: Movies;
  @Input() trending: Movies;
  @Input() title: string;

  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  constructor(private movie: MovieService, private router: Router) { }

  ngOnInit(): void {
  }

  afterChange(event: any) {
    // console.log(event);
    //  if(event.last) {
    //    this.endSlide = this.endSlide + 6;
    //    this.page++;
    //   this.subs.push(this.movie.getTrending(window.location.pathname, this.page).subscribe(data => this.movies = data));

    //  }

  }

  beforeChange(event: any) {
    //console.log(event);
  }

  goToDetails(movie: any) {
    const type = movie.media_type ? movie.media_type : 'movie';
    this.router.navigate([`details/${type}/${movie.id}`]);
    console.log(movie)

  }


}
