import { Component, OnInit, Input } from '@angular/core';
import { Genres } from 'src/app/models/genres.model';
import { MovieService } from '../../service/movie.service';
import { AuthService } from '../../service/auth.service';
import { FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  activeState = '';
  states = [
    {id:'Home', route: '/'},
    {id:'Movies', route: '/movies'},
    {id:'TV Series', route: '/tv-series'},
    {id:'Favorites', route: '/favorites'}
  ];


  genres: Genres;
  subs: Subscription[] = [];
  searchForm = this.formBuilder.group({
    search: ''
  });

  constructor(
    private movie: MovieService,
    private authService: AuthService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.subs.push(this.movie.getGenres().subscribe((data: Genres) => this.genres = data));
    this.activeState = 'Home';

  }

  getSearchResults(): void {

  }

  logout(): void {
    this.authService.logout();
  }

  setStateAsActive(state: string) {
    this.activeState = state;
  }

}
