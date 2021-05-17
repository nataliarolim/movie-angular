import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movies } from '../../models/movies.model';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm = this.formBuilder.group({
    search: ''
  });
  pageSize: '';

  trending: Movies;
  popular: Movies;
  subs: Subscription[] = []; // consume data
  //will be connected to observers and whenever they observe a new value or change in data, they will execute code with the help of Subscription
  // and all the subscribed components will receive the updated outcome
  constructor(
    private movie: MovieService,
    private formBuilder: FormBuilder

  ) {
  }

  ngOnInit(): void {
    this.subs.push(this.movie.getPopular(window.location.pathname, 1).subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTrending(window.location.pathname, 1).subscribe(data => this.trending = data));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
  //When we subscribe to some observable to get a certain result once that component is getting destroyed along with that to cancel subscription
  getSearchResults(): void {
    console.log(this.searchForm.value)
  }

  changePage(event: any) {
    const page = event.pageIndex === 0 ? 1 : event.pageIndex + 1;
    this.subs.push(this.movie.getPopular(window.location.pathname, page).subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTrending(window.location.pathname, page).subscribe(data => this.trending = data));
  }

}
