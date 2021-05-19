import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDetails } from 'src/app/models/movie-details.model';
import { TVDetails } from 'src/app/models/tv-details.model';
import { MovieService } from 'src/app/service/movie.service';
import { DatabaseService } from 'src/app/service/database.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: MovieDetails;
  tvDetails: TVDetails;
  subs: Subscription[] = [];
  constructor(private movie: MovieService, private database: DatabaseService) { }

  ngOnInit(): void {
    const media_type = window.location.pathname.split("/")[2];
    const id = Number(window.location.pathname.split("/")[3]);

    media_type === 'movie' ? this.movie.getDetailsMovie(id).subscribe((data: MovieDetails) => this.movieDetails = data) :
      this.movie.getDetailsTV(id).subscribe((data: TVDetails) => this.tvDetails = data)
  }

  addFavorite(): void {
    const current_user = JSON.parse(localStorage.getItem('currentUser') || "{}");
    this.database.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id_favorite: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (window.location.pathname !== "/favorites") {
        const favorites = data.filter(elem =>
          elem.id_user === current_user.uid && (this.movieDetails?.id === elem.id || this.tvDetails?.id === elem.id));
        if (favorites.length === 0) {
            this.database.addUserFavorite({
            id_user: current_user.uid,
            id: this.movieDetails?.id,
            title: this.movieDetails?.title,
            poster_path: this.movieDetails?.poster_path
          });
        }
      }
    });
  }
}


