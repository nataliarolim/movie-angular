import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/service/database.service';
import { map } from 'rxjs/operators';
import { UserFavorites } from '../../models/user-favorites.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: UserFavorites[];

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
    const current_user = JSON.parse(localStorage.getItem('currentUser') || "{}");
    this.database.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id_favorite: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.favorites = data.filter(elem => elem?.id_user === current_user.uid);
    });
  }

  removeFavorite(favorite: any): void{
    this.database.deleteUserFavorite(favorite?.id_favorite)
  }
}
