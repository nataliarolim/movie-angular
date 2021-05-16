import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDetails } from 'src/app/models/movie-details.model';
import { TVDetails } from 'src/app/models/tv-details.model';
import { MovieService } from 'src/app/service/movie.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  toggle = false;
  movie_details: MovieDetails;
  tv_details: TVDetails
  subs: Subscription[] = [];
  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    const media_type = window.location.pathname.split("/")[2];
    const id = Number(window.location.pathname.split("/")[3]);

    media_type === 'movie' ? this.movie.getDetailsMovie(id).subscribe((data: MovieDetails) => this.movie_details = data) :
      this.movie.getDetailsTV(id).subscribe((data: TVDetails) => this.tv_details = data)
  }

  addOrRemoveFavorite(): void {
    this.toggle = !this.toggle;
  }
}


