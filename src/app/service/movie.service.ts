import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movies } from '../models/movies.model';
import { Genres } from '../models/genres.model';
import { MovieDetails } from '../models/movie-details.model';
import { TVDetails } from '../models/tv-details.model';

const enum endpoint {
  top_rated_tv = '/tv/top_rated',
  popular = '/movie/popular',
  popular_tv = '/tv/popular',
  trending = '/trending/all/week',
  trending_movie = '/trending/movie/week',
  trending_tv = '/trending/tv/week',
  originals = '/discover/tv',
  genres = '/genre/movie/list'
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

  getTrending(path: string, page: number): Observable<Movies> {
    const url: any = {
      '/': endpoint.trending,
      '/tv-series': endpoint.trending_tv,
      '/movies': endpoint.trending_movie
    }
    return this.http.get<Movies>(`${this.URL}${url[path]}`, {
      params: {
        api_key: this.apiKey,
        page: page
      }
    });
  }

  getPopular(path: string): Observable<Movies> {
    const url: any = {
      '/': endpoint.popular,
      '/tv-series': endpoint.popular_tv,
      '/movies': endpoint.popular
    }
    return this.http.get<Movies>(`${this.URL}${url[path]}`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  getGenres(): Observable<Genres> {

    return this.http.get<Genres>(`${this.URL}${endpoint.genres}`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  getDetailsMovie(id: number): Observable<MovieDetails> {

    return this.http.get<MovieDetails>(`${this.URL}/movie/${id}`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  getDetailsTV(id: number): Observable<TVDetails> {

    return this.http.get<TVDetails>(`${this.URL}/tv/${id}`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

}
