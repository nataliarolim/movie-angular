import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
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
export class HeaderComponent implements OnInit{
  searchForm = this.formBuilder.group({
    search: ''
  });

  activeState ='Home';
  states = [
    {id:'Home', route: '/'},
    {id:'Movies', route: '/movies'},
    {id:'TV Series', route: '/tv-series'},
    {id:'Favorites', route: '/favorites'}
  ];


  genres: Genres;
  subs: Subscription[] = [];


  constructor(
    private movie: MovieService,
    private authService: AuthService,
    private formBuilder: FormBuilder


  ) { }


  ngOnInit(): void {
    this.subs.push(this.movie.getGenres().subscribe((data: Genres) => this.genres = data));

  }

  logout(): void {
    this.authService.logout();
  }

  setStateAsActive(state: string) {
    this.activeState = state;
  }

  getSearchResults(): void {
    console.log(this.searchForm.value)

  }

}
