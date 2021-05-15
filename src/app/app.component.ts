import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { Movies } from './models/movies.model';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  trending: Movies;
  popular: Movies;
  subs: Subscription[] = []; // consume data
//will be connected to observers and whenever they observe a new value or change in data, they will execute code with the help of Subscription
// and all the subscribed components will receive the updated outcome

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
    infinite: true
  }
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.subs.push(this.movie.getTrendingMovie().subscribe(data => this.trending = data));
    this.subs.push(this.movie.getPopularMovie().subscribe(data => this.popular = data));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
  //When we subscribe to some observable to get a certain result once that component is getting destroyed along with that to cancel subscription
  //
}
