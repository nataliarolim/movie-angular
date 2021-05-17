import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserFavorites } from '../models/user-favorites.model';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  userFavoritesCollection: AngularFirestoreCollection<UserFavorites>;
  userFavorites: Observable<UserFavorites[]>;

  constructor(private afs: AngularFirestore) {
    this.userFavoritesCollection = this.afs.collection<UserFavorites>('user-favorites');
    this.userFavorites = this.userFavoritesCollection.valueChanges();
  }

  addUserFavorite(userFavorite: UserFavorites): void {
    this.userFavoritesCollection.add(userFavorite);
  }

  deleteUserFavorite(id_favorite: string) {
    this.userFavoritesCollection.doc(id_favorite).delete();
  }

  getAll(): AngularFirestoreCollection<UserFavorites> {
    return this.userFavoritesCollection;
  }
}


