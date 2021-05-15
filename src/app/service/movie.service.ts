import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies.model';

const enum endpoint {
  latest = '/movie/latest',
  now_playing = '/movie/now_playing',
  popular = '/movie/popular',
  top_rated = '/movie/top_rated',
  upcoming = '/movie/upcoming',
  trending = '/trending/all/week',
  originals = '/discover/tv'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private URL: string = 'https://api.themoviedb.org/3';
  private apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) { }

  //In Angular applications preferred way for event handling or asynchronous programming is by using observables. Observables provide support
  // for data sharing between publishers and subscribers
  getTrendingMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.trending}`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  getPopularMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.popular}`, {
      params: {
        api_key: this.apiKey
      }
    });
  }
}
