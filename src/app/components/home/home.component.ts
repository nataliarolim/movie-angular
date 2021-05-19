import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Movies } from '../../models/movies.model';
import { MovieService } from '../../service/movie.service';
import { MovieDetails } from 'src/app/models/movie-details.model';
import { Router } from '@angular/router';

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
  searchMovies: any;
  subs: Subscription[] = []; // consume data
  //will be connected to observers and whenever they observe a new value or change in data, they will execute code with the help of Subscription
  // and all the subscribed components will receive the updated outcome
  constructor(
    private movie: MovieService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getPopularAndTrending()
  }

  getPopularAndTrending(): void {
    this.subs.push(this.movie.getPopular(window.location.pathname, 1).subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTrending(window.location.pathname, 1).subscribe(data => this.trending = data));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
  //When we subscribe to some observable to get a certain result once that component is getting destroyed along with that to cancel subscription

  getSearchResults(): void {
    const searchValue = this.searchForm.value.search;
    if (searchValue) {
      this.subs.push(this.movie.searchMovies(this.searchForm.value.search, 1).subscribe(data => this.searchMovies = data.results));
    } else {
      this.getPopularAndTrending();
      this.searchMovies = '';
    }
  }

  changePage(event: any) {
    const page = event.pageIndex === 0 ? 1 : event.pageIndex + 1;
    if (this.searchMovies) {
      this.subs.push(this.movie.searchMovies(this.searchForm.value.search, page).subscribe(data => this.searchMovies = data.results));
    } else {
      this.subs.push(this.movie.getPopular(window.location.pathname, page).subscribe(data => this.popular = data));
      this.subs.push(this.movie.getTrending(window.location.pathname, page).subscribe(data => this.trending = data));
    }
  }

  goToDetails(movie: any) {
    const type = movie.media_type ? movie.media_type : 'movie';
    this.router.navigate([`details/${type}/${movie.id}`]);
  }

}
