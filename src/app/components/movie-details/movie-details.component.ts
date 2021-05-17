import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDetails } from 'src/app/models/movie-details.model';
import { TVDetails } from 'src/app/models/tv-details.model';
import { MovieService } from 'src/app/service/movie.service';
import { DatabaseService } from 'src/app/service/database.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  toggle = false;
  movie_details: MovieDetails;
  tv_details: TVDetails;
  subs: Subscription[] = [];
  constructor(private movie: MovieService, private database: DatabaseService) { }

  ngOnInit(): void {
    const media_type = window.location.pathname.split("/")[2];
    const id = Number(window.location.pathname.split("/")[3]);

    media_type === 'movie' ? this.movie.getDetailsMovie(id).subscribe((data: MovieDetails) => this.movie_details = data) :
      this.movie.getDetailsTV(id).subscribe((data: TVDetails) => this.tv_details = data)
  }

  addFavorite(): void {
    const current_user = JSON.parse(localStorage.getItem('currentUser') || "{}");
    this.toggle = !this.toggle;
    this.database.addUserFavorite({id_user: current_user.uid, id: this.movie_details.id, title: this.movie_details.title, poster_path: this.movie_details.poster_path});

  }
}


