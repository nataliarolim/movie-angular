import { Component, OnInit } from '@angular/core';
import { Genres } from 'src/app/models/genres.model';
import { AuthService } from '../../service/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeState = 'Home';
  states = [
    { id: 'Home', route: '/' },
    { id: 'Movies', route: '/movies' },
    { id: 'TV Series', route: '/tv-series' },
    { id: 'Favorites', route: '/favorites' }
  ];

  genres: Genres;
  subs: Subscription[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  setStateAsActive(state: string) {
    this.activeState = state;
  }

}
